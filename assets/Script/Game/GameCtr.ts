import { _decorator, Component, Node, CCInteger, AudioClip } from 'cc';
import { ObjCtr } from '../Obj/ObjCtr';
import { UICtr } from '../UI/UICtr';
import { GameData } from './GameData';
import { SpawnCtrl } from './SpawnCtrl';
import { GameAudio } from './GameAudio';
const { ccclass, property } = _decorator;

@ccclass('GameCtr')
export class GameCtr extends Component {

    static instance: GameCtr = null;
    onLoad() {
        GameCtr.instance = this;
    }


    @property(GameData)
    gameData: GameData;
    @property(SpawnCtrl)
    spawnctr: SpawnCtrl;
    @property(UICtr)
    uiCtr: UICtr;

    @property(CCInteger)
    numberCantShoot: number;

    currentCantShoot: number;
    score : number;
    bestScore : number;
    isGameOver: boolean;
    isWait: boolean;

    listObjSpawned: Node[] = [];
    start() {
        localStorage.getItem("N138-best") ? (this.bestScore = parseInt(localStorage.getItem("N138-best"))) : this.bestScore = 0;
        this.SetDefault();
        GameAudio.instance.onInitialize(true);
        GameAudio.instance.onPlayMusic("BGM",GameAudio.instance.lisAudio[6],0.5,true);
    }

    update(deltaTime: number) {
        
    }

    CheckGameOver() {
        if (this.isGameOver) {
            if (this.CheckDoneSpawn()) {
                this.uiCtr.ShowGameOverPanel();
            }
            return;
        }

        // set UI
        this.uiCtr.SetSpriteHeart(this.currentCantShoot-1);
        console.log(this.currentCantShoot+ "|" + this.numberCantShoot);
        if (this.currentCantShoot >= this.numberCantShoot) {
            this.isGameOver = true;
            if (this.CheckDoneSpawn()) {
                this.scheduleOnce(()=>{this.uiCtr.ShowGameOverPanel();},0.3);
            }
            console.log("gameover");
            //set ui;
        } 
    }

    CheckDoneSpawn(): boolean {
        console.log(this.listObjSpawned.length);
        if (this.listObjSpawned.length <= 0){
            this.SetBestScore();
            return true;
        } 
        return false;
    }
    RemoveObj(obj: Node) {
        let i = this.listObjSpawned.indexOf(obj);
        this.listObjSpawned.splice(i, 1);
    }

    AddScore(add : number){
        this.score += add;
        this.uiCtr.SetScore(this.score);
        this.spawnctr.ResetSpeedTime(this.score);
    }

    SetDefault() {
        this.currentCantShoot = 0;
        this.uiCtr.SetDefault();
        this.score = 0;
        this.isGameOver = false;
        this.isWait = true;
        this.listObjSpawned = [];
    }

    PlayGame() {
        this.isWait = false;
    }
    PlaySound(nameChanel : string,sound : AudioClip,vl : number){
        if(!this.uiCtr.isOnS) return;
        GameAudio.instance.onPlaySFX(nameChanel,sound,vl,false);
    }
    SetBestScore(){
        if(this.bestScore < this.score) {
            this.bestScore = this.score;
            localStorage.setItem("N138-best",this.bestScore.toString());
        }
    }
}


