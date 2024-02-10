import { _decorator, Component, Node, PhysicsSystem2D, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('HandleTouch')
export class HandleTouch extends Component {
    start() {
        
    }

    update(deltaTime: number) {
        
    }

    CheckCollider(point: Vec2) {
        let collider = PhysicsSystem2D.instance.testPoint(point);
        console.log(collider);
    }
}


