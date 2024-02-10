import { _decorator, Component, Node, EventTouch } from 'cc';
import { GunCtr } from './GunCtr';
const { ccclass, property } = _decorator;

@ccclass('InputManage')
export class InputManage extends Component {
    gunCtr: GunCtr;
    start() {
        this.node.on(Node.EventType.TOUCH_START, this.OnTouch, this);
    }

    update(deltaTime: number) {
        
    }
    OnTouch(event: EventTouch) {
        let pos = event.getUILocation();
        this.gunCtr.handleTouch.CheckCollider(pos);
    }
}


