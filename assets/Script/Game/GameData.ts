import { _decorator, Component, Node, SpriteFrame, CCInteger, randomRangeInt } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameData')
export class GameData extends Component {
    @property(CCInteger)
    listScore: number[] = [];
    @property(SpriteFrame)
    listSprite: SpriteFrame[] = [];

    data = { 'score': [], 'sprite': [] };
    start() {
        this.data.score = this.listScore;
        this.data.sprite = this.listSprite;
    }

    update(deltaTime: number) {
        
    }

    RandomData(): number {
        let i = -1;
        let ran = randomRangeInt(0, this.listSprite.length);
        (ran > -1) ? (i = ran) : (i = -1);
        return i;
    }
}


