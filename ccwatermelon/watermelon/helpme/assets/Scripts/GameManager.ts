
import { _decorator, Component,instantiate, Node, Prefab, TERRAIN_BLOCK_VERTEX_SIZE } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = GameManager
 * DateTime = Sat Jan 29 2022 19:51:52 GMT+0800 (中国标准时间)
 * Author = tianci
 * FileBasename = GameManager.ts
 * FileBasenameNoExtension = GameManager
 * URL = db://assets/Scripts/GameManager.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */

 enum BlockType{
    BT_NONE,
    BT_STONE,
}
 
@ccclass('GameManager')
export class GameManager extends Component {
    // [1]
    // dummy = '';
    //赛道预制
    @property(Prefab)
    public cubePrfb:Prefab | null = null;
    //赛道长度
    @property
    public roadLength = 500;
    private _road:BlockType[] = [];

    // [2]
    // @property
    // serializableDummy = 0;

    start () {
        this.generateRoad();
    }

    generateRoad(){
        //防止游戏重新开始，赛道还是旧的赛道，因此移除赛道
        this.node.removeAllChildren();
        this._road = [];
        //确保游戏运行时，任务一定在是路上
        this._road.push(BlockType.BT_STONE);

        //确定好每一格赛道类型
        for(let i= 1; i<this.roadLength; i++){
            //如果上一格赛道是坑，那么这一格一定不是坑
            if(this._road[i-1] === BlockType.BT_NONE){
                this._road.push(BlockType.BT_STONE);
            }else{
                this._road.push(Math.floor(Math.random()*2));
            }
        }

        //根据赛道类型生成赛道
        for(let j = 0 ; j < this._road.length; j++){
            let block:Node = this.spawnBlockByType(this._road[j]);
            //判断是否生成了道路，因为 spawnBlockByType 有可能返回坑（值为 null）
            if(block){
                this.node.addChild(block);
                block.setPosition(j,-1.5,0);
            }
        }
    }

    spawnBlockByType(type:BlockType){
        if(!this.cubePrfb){
            return null;
        }
        let block: Node | null = null;
        // 赛道类型为实路才生成
        switch(type) {
            case BlockType.BT_STONE:
                block = instantiate(this.cubePrfb);
                break;
        }

        return block;
    }

    update (deltaTime: number) {
        // [4]
    }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.4/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.4/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.4/manual/en/scripting/life-cycle-callbacks.html
 */
