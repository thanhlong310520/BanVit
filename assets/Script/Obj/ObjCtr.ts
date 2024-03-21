import { _decorator, Component, Node, RigidBody, RigidBody2D, Vec2, randomRangeInt, Collider2D, Collider, Contact2DType, IPhysics2DContact, Sprite } from 'cc';
import { GameCtr } from '../Game/GameCtr';
import { Spawner } from '../Game/Spawner';
import { MoveObj } from './MoveObj';
const { ccclass, property } = _decorator;

@ccclass('ObjCtr')
export class ObjCtr extends Component {

    @property(RigidBody2D)
    rig: RigidBody2D;
    @property(Collider2D)
    collider: Collider2D;
    @property(Sprite)
    sprite: Sprite;
    @property(MoveObj)
    objMove: MoveObj;

    isBoom: boolean = false;
    score: number;
    speed: Vec2;

    start() {
        this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    }

    update(deltaTime: number) {
        
    }
    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        if (otherCollider.tag == 10) {
            this.ChangeSpeed();
            this.objMove.Moving(this.speed);
        }
        if (otherCollider.tag == 100) {
            this.ContactDespawnBox();
        }
    }

    BeginSpawn(startspeed: Vec2, index: number) {

        this.objMove.ctr = this;
        this.SetData(index);
        this.SetSpeed(startspeed);

    }
    SetSpeed(startspeed: Vec2) {
        let y = this.RandomSpeed(startspeed.y);
        this.speed = new Vec2(-startspeed.x, y);
        this.objMove.Moving(this.speed);
    }

    SetData(i) {
        let dt = GameCtr.instance.gameData;
        this.sprite.spriteFrame = dt.data.sprite[i];
        this.score = dt.data.score[i];
        this.isBoom = false;
        if (i == dt.data.sprite.length - 1) this.isBoom = true;
    }


    RandomSpeed(y: number) {
        let i = randomRangeInt(0, 2);
        if (i == 0) y *= (-1);
        return y;
    }

    ChangeSpeed() {
        this.speed = new Vec2(this.speed.x, -this.speed.y);
    }

    ContactDespawnBox() {
        GameCtr.instance.RemoveObj(this.node);
        if(!this.isBoom)
        {
            GameCtr.instance.currentCantShoot++;
        } 
        GameCtr.instance.CheckGameOver();
        this.scheduleOnce(() => { Spawner.instance.Despawn(this.node); }, 0.01);
    }

}


