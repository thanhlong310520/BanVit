import { _decorator, Component, Node, CCInteger } from 'cc';
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

    @property(CCInteger)
    numberCantShoot: number;

    currentCantShoot: number;
    isGameOver: boolean;
    start() {
        this.ResetGame();
    }

    update(deltaTime: number) {
        
    }

    CheckGameOver() {
        console.log(this.currentCantShoot);
        if (this.isGameOver) return;
        this.currentCantShoot++;
        // set UI


        if (this.currentCantShoot >= this.numberCantShoot) {
            this.isGameOver = true;
            console.log("gameover");
            //set ui;
        }
        
    }

    ResetGame() {
        this.currentCantShoot = 0;
        this.isGameOver = false;
    }
}


