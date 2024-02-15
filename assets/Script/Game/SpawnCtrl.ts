import { _decorator, Component, Node, game, randomRangeInt, Vec2, CCFloat } from 'cc';
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

    @property(CCFloat)
    timeSpawn: number;

    curentTime: number;
    start() {
        this.SetDefault();
    }

    update(deltaTime: number) {
        if (GameCtr.instance.isWait || GameCtr.instance.isGameOver) return;
        this.Spawn();
    }

    Spawn() {
        if (this.curentTime >= this.timeSpawn) {
            this.curentTime = 0;
            let obj = Spawner.instance.Spawning();
            this.SetData(obj);
            GameCtr.instance.listObjSpawned.push(obj);
        }
        else {
            this.curentTime += game.deltaTime;
        }
    }

    SetData(obj: Node) {
        let i = this.RandomPos();
        obj.setParent(this.node);
        obj.setWorldPosition(this.listPos[i].worldPosition);
        obj.getComponent(ObjCtr).BeginSpawn(this.speedObj, GameCtr.instance.gameData.RandomData());
        obj.active = true;
    }

    RandomPos(): number {
        let i = -1;
        let ran = randomRangeInt(0, this.listPos.length);
        (ran > -1) ? (i = ran) : (i = -1);
        return i;
    }

    SetDefault() {
        this.curentTime = 0;
    }
}


