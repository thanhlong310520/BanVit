import { _decorator, Component, Node, Input } from 'cc';
import { HandleTouch } from './HandleTouch';
import { InputManage } from './InputManage';
const { ccclass, property } = _decorator;

@ccclass('GunCtr')
export class GunCtr extends Component {
    @property(InputManage)
    inputManager: InputManage;
    @property(HandleTouch)
    handleTouch: HandleTouch;
    start() {
        this.inputManager.gunCtr = this;
    }

    update(deltaTime: number) {
        
    }
}


