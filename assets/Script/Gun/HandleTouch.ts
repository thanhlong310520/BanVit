import { _decorator, Component, Node, PhysicsSystem2D, Vec2 } from 'cc';
import { Spawner } from '../Game/Spawner';
import { GameCtr } from '../Game/GameCtr';
import { ObjCtr } from '../Obj/ObjCtr';
import { GameAudio } from '../Game/GameAudio';
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
                let objCtr = c.getComponent(ObjCtr);
                GameCtr.instance.spawnctr.SpawnEffect(objCtr);
                console.log(objCtr.isBoom);
                GameCtr.instance.AddScore(objCtr.score);
                let isBoom = objCtr.isBoom;
                GameCtr.instance.RemoveObj(c.node);
                if(isBoom){
                    GameCtr.instance.PlaySound("boom",GameAudio.instance.lisAudio[2],0.5);
                    GameCtr.instance.currentCantShoot++;
                }
                else{
                    GameCtr.instance.PlaySound("boom",GameAudio.instance.lisAudio[0],0.5);
                }
                GameCtr.instance.CheckGameOver();
                Spawner.instance.Despawn(c.node);
            }
        })

    }
}


