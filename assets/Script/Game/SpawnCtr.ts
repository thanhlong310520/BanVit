import { _decorator, Component, Node, CCFloat, randomRangeInt, game, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SpawnCtr')
export class SpawnCtr extends Component {
    @property(Node)
    listPos: Node[] = [];
    @property(Vec2)
    speedObj: Vec2;

    @property(CCFloat)
    timeSpawn: number;

    curentTime: number;
    start() {
        this.SetDefault();
    }

    update(deltaTime: number) {
        this.Spawn();
    }

    Spawn() {
        if (this.curentTime >= this.timeSpawn) {
            this.curentTime = 0;
            let i = this.RandomPos();
            console.log(i);
        }
        else {
            this.curentTime += game.deltaTime;
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
    }
}


