import { _decorator, Component, EditBox, Label, Node, Sprite, SpriteFrame, Vec2 } from 'cc';
import { GameCtr } from '../Game/GameCtr';
import { GameAudio } from '../Game/GameAudio';
const { ccclass, property } = _decorator;

@ccclass('UICtr')
export class UICtr extends Component {

    @property(Node)
    playPanel: Node;
    @property(Node)
    gameoverPanel: Node;

    @property(Label)
    scoreLabel : Label;
    @property(Label)
    scoreLabelGameOver : Label;
    @property(Label)
    bestScore : Label;
    @property(Sprite)
    listHeart : Sprite[] = [];
    @property(SpriteFrame)
    heartSprite : SpriteFrame[] = [];
    @property(EditBox)
    speedy: EditBox;
    @property(EditBox)
    speedx: EditBox;
    @property(EditBox)
    timeSpawn: EditBox;
    @property(EditBox)
    scoreScale: EditBox;
    
    @property({type : Sprite}) auidoSprite : Sprite;
    @property({type : SpriteFrame}) onoff : SpriteFrame[] = [];
    isOnS : boolean = true;

    start() {
        this.isOnS = true;
    }

    update(deltaTime: number) {
        
    }
    ShowGameOverPanel() {
        this.gameoverPanel.active = true;
        this.scoreLabelGameOver.string = GameCtr.instance.score.toString();
        this.bestScore.string = GameCtr.instance.bestScore.toString();

    }

    ClickButtonPlay() {
        this.PlaySoudButtonClick();
        this.playPanel.active = false;
        GameCtr.instance.PlayGame();
        this.SetThongSo();
    }

    ClickButtonReplay() {
        this.PlaySoudButtonClick();
        this.gameoverPanel.active = false;
        // this.playPanel.active = true;
        GameCtr.instance.SetDefault();
        GameCtr.instance.PlayGame();
        // this.SetThongSo();

    }

    SetThongSo(){

        let y = parseFloat(this.speedy.string);
        let x = parseFloat(this.speedx.string);
        let t = parseFloat(this.timeSpawn.string);
        let ss = parseFloat(this.scoreScale.string);
        GameCtr.instance.spawnctr.speedObj = new Vec2(x,y);
        GameCtr.instance.spawnctr.curentSpeed = new Vec2(x,y);
        GameCtr.instance.spawnctr.timeSpawn = t;
        GameCtr.instance.spawnctr.timer = t;
        GameCtr.instance.spawnctr.scoreScale = ss;
    }

    SetScore(score : number){
        this.scoreLabel.string = score.toString();
    }
    SetSpriteHeart(index){
        if(index < 0) return;
        this.listHeart[index].spriteFrame = this.heartSprite[1];
    }
    SetDefault(){
        this.SetScore(0);
        this.listHeart.forEach(h=>{h.spriteFrame = this.heartSprite[0]});
    }
    OnOffSound(){
        this.PlaySoudButtonClick();
        this.isOnS = !this.isOnS;
        if(!this.isOnS) {
            GameAudio.instance.onGetChannelMusic("BGM").stop();
            this.auidoSprite.spriteFrame = this.onoff[1];
        }
        else{
            this.auidoSprite.spriteFrame = this.onoff[0];
            GameAudio.instance.onPlayMusic("BGM",GameAudio.instance.lisAudio[6],0.5,true);
        }
    }
    PlaySoudButtonClick(){
        GameCtr.instance.PlaySound("click button", GameAudio.instance.lisAudio[3],1)
    }
}


