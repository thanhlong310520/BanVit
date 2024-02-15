import { _decorator, Component, Node, CCInteger } from 'cc';
import { ObjCtr } from '../Obj/ObjCtr';
import { UICtr } from '../UI/UICtr';
import { GameData } from './GameData';
const { ccclass, property } = _decorator;

@ccclass('GameCtr')
export class GameCtr extends Component {

    static instance: GameCtr = null;
    onLoad() {
        GameCtr.instance = this;
    }


    @property(GameData)
    gameData: GameData;
    @property(UICtr)
    uiCtr: UICtr;

    @property(CCInteger)
    numberCantShoot: number;

    currentCantShoot: number;
    isGameOver: boolean;
    isWait: boolean;

    listObjSpawned: Node[] = [];
    start() {
        this.ResetGame();
    }

    update(deltaTime: number) {
        
    }

    CheckGameOver(ctr: ObjCtr) {
        if (this.isGameOver) {
            if (this.CheckDoneSpawn()) {
                this.uiCtr.ShowGameOverPanel();
            }
            return;
        }

        if (!ctr.isBoom) {
            this.currentCantShoot++;
        }
        // set UI


        if (this.currentCantShoot >= this.numberCantShoot) {
            this.isGameOver = true;
            
            console.log("gameover");
            //set ui;
        } 
    }

    CheckDoneSpawn(): boolean {
        if (this.listObjSpawned.length <= 0) return true;
        return false;
    }
    RemoveObj(obj: Node) {
        let i = this.listObjSpawned.indexOf(obj);
        this.listObjSpawned.splice(i, 1);
        this.CheckGameOver(obj.getComponent(ObjCtr));
    }

    ResetGame() {
        this.currentCantShoot = 0;
        this.isGameOver = false;
        this.isWait = true;
        this.listObjSpawned = [];
    }

    PlayGame() {
        this.isWait = false;
    }
}


