import { _decorator, Component, instantiate, Node, NodePool, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Spawner')
export class Spawner extends Component {
    static instance: Spawner;
    protected onLoad(): void {
        Spawner.instance = this;
    }

    @property(Node)
    objPrefab : Node[] = [];

    listPool :NodePool[] = [];
    start() {
        this.listPool = new Array(this.objPrefab.length).fill(null).map(x => new NodePool());
        this.Intialization();
    }

    update(deltaTime: number) {
        
    }
    Intialization(){
        for(let index = 0 ; index < this.objPrefab.length;index++){

            for(let i = 0; i< 5; i++){
                let tempObj = instantiate(this.objPrefab[index]);
                this.listPool[index].put(tempObj);
            }
        }
    }
    Spawning(i : number) : Node{
        let tempObj = null;
        if(this.listPool[i].size() > 0){
            tempObj = this.listPool[i].get();
        }
        else {
            // console.log("het");
            tempObj = instantiate(this.objPrefab[i]);
        }
        return tempObj;
    }

    Despawn(tempObj : Node){
        let i : number = -1;
        this.objPrefab.forEach(obj =>{
            if(obj.name == tempObj.name){
                i = this.objPrefab.indexOf(obj);
            }
        })
        if(i == -1) tempObj.destroy();
        else{
            this.listPool[i].put(tempObj);
        }
    }
}


