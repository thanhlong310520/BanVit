import { _decorator, Component, Node, randomRangeInt, Vec2 } from 'cc';
import { ObjCtr } from './ObjCtr';
const { ccclass, property } = _decorator;

@ccclass('MoveObj')
export class MoveObj extends Component {

    ctr : ObjCtr;
    start() {

    }

    update(deltaTime: number) {
        
    }

    Moving(speed: Vec2) {
        this.ctr.rig.linearVelocity = speed;
    }
}


