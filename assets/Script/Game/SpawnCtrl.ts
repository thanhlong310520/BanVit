import { _decorator, Component, Node, game, randomRangeInt, Vec2, CCFloat, Vec3, sp } from 'cc';
import { ObjCtr } from '../Obj/ObjCtr';
import { GameCtr } from './GameCtr';
import { Spawner } from './Spawner';
const { ccclass, property } = _decorator;

@ccclass('SpawnCtrl')
export class SpawnCtrl extends Component {
    @property({ type: [Node] })
    listPos: Node[] = [];
    @property({ type: Vec2 })
    speedObj: Vec2;
    @property({ type: CCFloat })
    scoreScale: number = 100;

    @property(CCFloat)
    timeSpawn: number;

    curentTime: number;

    curentSpeed : Vec2;
    timer : number;
    oldScore  : number;
    start() {
        this.SetDefault();
    }

    update(deltaTime: number) {
        if (GameCtr.instance.isWait || GameCtr.instance.isGameOver) return;
        this.SpawnObj();
    }

    SpawnObj() {
        if (this.curentTime >= this.timeSpawn) {
            this.curentTime = 0;
            let obj = Spawner.instance.Spawning(0);
            this.SetData(obj);
            GameCtr.instance.listObjSpawned.push(obj);
        }
        else {
            this.curentTime += game.deltaTime;
        }
    }
    SpawnEffect(obj : ObjCtr){
        let ef : Node;
        let nameAnim : string;
        if(obj.isBoom){
            ef = Spawner.instance.Spawning(1);
            nameAnim = "thienthach";
        }
        else{
            ef = Spawner.instance.Spawning(2);
            nameAnim = "animation";
        }
        ef.parent = this.node;
        ef.worldPosition = obj.node.worldPosition;
        ef.active = true;
        ef.getComponent(sp.Skeleton).animation = nameAnim;
        this.scheduleOnce(()=>{Spawner.instance.Despawn(ef)},0.5);
    }

    SetData(obj: Node) {
        let i = this.RandomPos();
        obj.setParent(this.node);
        obj.setWorldPosition(this.listPos[i].worldPosition);

        obj.getComponent(ObjCtr).BeginSpawn(this.curentSpeed, GameCtr.instance.gameData.RandomData());
        obj.active = true;
    }

    ResetSpeedTime(score : number){
        if(this.oldScore < score){
            this.oldScore = score;
            let add = Math.floor(this.oldScore/this.scoreScale);
            this.curentSpeed = new Vec2(this.speedObj.x+add,this.speedObj.y+add/2);
            this.timer = this.timeSpawn - add/25;
            if(this.timer < 0.4) this.timer = 0.4;
            console.log(this.timer);
            console.log(this.curentSpeed);

        }
    }

    RandomPos(): number {
        let i = -1;
        let ran = randomRangeInt(0, this.listPos.length);
        (ran > -1) ? (i = ran) : (i = -1);
        return i;
    }

    SetDefault() {
        this.curentTime = 0;
        this.oldScore = 0;
        this.timer = this.timeSpawn;
        this.curentSpeed = this.speedObj;
    }
}


