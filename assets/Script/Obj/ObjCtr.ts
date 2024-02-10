import { _decorator, Component, Node, RigidBody, RigidBody2D, Vec2, randomRangeInt, Collider2D, Collider, Contact2DType, IPhysics2DContact } from 'cc';
import { MoveObj } from './MoveObj';
const { ccclass, property } = _decorator;

@ccclass('ObjCtr')
export class ObjCtr extends Component {

    @property(RigidBody2D)
    rig: RigidBody2D;
    @property(Collider2D)
    collider: Collider2D;
    @property(MoveObj)
    objMove: MoveObj;

    speed: Vec2;
    start() {
        this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        this.objMove.ctr = this;
        this.BeginSpawn(new Vec2(1, 1));
    }

    update(deltaTime: number) {
        
    }
    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        if (otherCollider.tag == 10) {
            console.log("change");
            this.ChangeSpeed();
            this.objMove.Moving(this.speed);
        }
    }

    BeginSpawn(startspeed: Vec2) {
        let y = this.RandomSpeed(startspeed.y);
        this.speed = new Vec2(-startspeed.x, y);
        this.objMove.Moving(this.speed);
    }

    RandomSpeed(y: number) {
        let i = randomRangeInt(0, 2);
        if (i == 0) y *= (-1);
        return y;
    }

    ChangeSpeed() {
        this.speed = new Vec2(this.speed.x, -this.speed.y);
    }
}


