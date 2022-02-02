
import { _decorator, Vec3, Component,instantiate, Node, Prefab, Label, TERRAIN_BLOCK_VERTEX_SIZE } from 'cc';
const { ccclass, property } = _decorator;
import { PlayerController } from './PlayerController';

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
};

//游戏状态
enum GameState{
    GS_INIT,
    GS_PLAYING,
    GS_END,
};
 
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

    @property(PlayerController)
    public playerCtrl: PlayerController | null = null;

    @property(Node)
    public startMenu: Node | null = null;

    @property(Label)
    public stepsLabel:Label | null = null;


    // private curState:GameState = GameState.GS_INIT;

    // [2]
    // @property
    // serializableDummy = 0;

    start () {
        //this.generateRoad();
        this.curState = GameState.GS_INIT;
        this.playerCtrl?.node.on('JumpEnd', this.onPlayerJumpEnd, this);
    }

    onPlayerJumpEnd(moveIndex:number){
        if(this.stepsLabel){
            console.log("stepsLbale is not null");
            // 因为在最后一步可能出现步伐大的跳跃，但是此时无论跳跃是步伐大还是步伐小都不应该多增加分数
            this.stepsLabel.string = '' + (moveIndex >= this.roadLength ? this.roadLength : moveIndex);
        }else{
            console.log("stepsLbale is null");
        }
        this.checkResult(moveIndex);
    }

    init(){
        //激活主界面
        if(this.startMenu){
            this.startMenu.active = true;
        }

        //生成赛道
        this.generateRoad();
        if(this.playerCtrl){
            //禁止接受用户操作任务移动指令
            this.playerCtrl.setInputActive(false);
            //重置人物位置
            this.playerCtrl.node.setPosition(Vec3.ZERO);
        }
        this.playerCtrl.reset();
    }

    // set curState(value:GameState){
    //     switch(value){
    //         case GameState.GS_INIT:
    //             this.init();
    //             break;
    //             case GameState.GS_PLAYING:
    //                 if(this.startMenu){
    //                     this.startMenu.active = false;
    //                 }
    //                 setTimeout(()=>{
    //                     if(this.playerCtrl){
    //                         this.playerCtrl.setInputActive(true);
    //                     }
    //                 }, 0.1)
    //                 break;
    //                 case GameState.GS_END:
    //                     break;
    //     }
    // }

    onStartButtonClicked(){
        console.log("==> onStartButtonClicked");
        this.curState = GameState.GS_PLAYING;
    }

    checkResult(moveIndex:number){
        if(moveIndex < this.roadLength){
            if(this._road[moveIndex] == BlockType.BT_NONE){
                this.curState = GameState.GS_INIT;
            }
        }else{
            this.curState = GameState.GS_INIT;
        }
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

    set curState (value: GameState) {
        switch(value) {
            case GameState.GS_INIT:
                this.init();
                break;
            case GameState.GS_PLAYING:
                if (this.startMenu) {
                    this.startMenu.active = false;
                }
   
                if (this.stepsLabel) {
                    this.stepsLabel.string = '0';   // 将步数重置为0
                }
                setTimeout(() => {      // 直接设置 active 会直接开始监听鼠标事件，这里做了延迟处理
                    if (this.playerCtrl) {
                        this.playerCtrl.setInputActive(true);
                    }
                }, 0.1);
                break;
            case GameState.GS_END:
                break;
        }
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
