import { _decorator, Component, Node } from 'cc';
import { GameCtr } from '../Game/GameCtr';
const { ccclass, property } = _decorator;

@ccclass('UICtr')
export class UICtr extends Component {

    @property(Node)
    playPanel: Node;
    @property(Node)
    gameoverPanel: Node;

    start() {

    }

    update(deltaTime: number) {
        
    }
    ShowGameOverPanel() {
        this.gameoverPanel.active = true;
    }

    ClickButtonPlay() {
        this.playPanel.active = false;
        GameCtr.instance.PlayGame();
    }

    ClickButtonReplay() {
        this.gameoverPanel.active = false;
        this.playPanel.active = true;
        GameCtr.instance.ResetGame();

    }
}


