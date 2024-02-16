import { _decorator, Component, Node, PhysicsSystem2D, Vec2 } from 'cc';
import { Spawner } from '../Game/Spawner';
import { GameCtr } from '../Game/GameCtr';
const { ccclass, property } = _decorator;

@ccclass('HandleTouch')
export class HandleTouch extends Component {
    start() {
        
    }

    update(deltaTime: number) {
        
    }

    CheckCollider(point: Vec2) {
        let colliders = PhysicsSystem2D.instance.testPoint(point);
        if (colliders.length == 0) return;
        colliders.forEach(c => {
            //despawn;
            if (c.tag == 1) {
                GameCtr.instance.RemoveObj(c.node);
                Spawner.instance.Despawn(c.node);
            }
        })

    }
}


