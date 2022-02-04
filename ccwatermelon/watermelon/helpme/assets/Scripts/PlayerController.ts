
import { _decorator, Component, Node, Vec3, systemEvent, SystemEvent, EventMouse, log, Touch, Animation, EventTouch, view, screen } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = PlayerController
 * DateTime = Fri Jan 28 2022 15:45:22 GMT+0800 (中国标准时间)
 * Author = tianci
 * FileBasename = PlayerController.ts
 * FileBasenameNoExtension = PlayerController
 * URL = db://assets/Scripts/PlayerController.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */

@ccclass('PlayerController')
export class PlayerController extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    //是否接受到跳跃指令
    private _startJump:Boolean = false;
    //跳跃步长
    private _jumpStep:number = 0;
    //当前跳跃时间
    private _curJumpTime:number = 0;
    //每次跳跃时长
    private _jumpTime:number = 0.1;
    //当前跳跃速度
    private _curJumpSpeed:number = 0;
    //当前角色位置
    private _curPos:Vec3 = new Vec3();
    //每次跳跃过程中，当前帧移动位置差
    private _deltaPos:Vec3 = new Vec3(0,0,0);
    //角色位置目标
    private _targetPos:Vec3 = new Vec3();
    private _curMoveIndex = 0;
    

    // @property({type: Animation})
    @property(Animation)
    public BodyAnim: Animation | null = null;

    start () {
        console.log("==>> start");
        //systemEvent.on(SystemEvent.EventType.MOUSE_UP, this.onMouseUp, this);
        //systemEvent.on(SystemEvent.EventType.TOUCH_START, this.onTouchStart, this);
    }

    setInputActive(active: boolean) {
        if (active) {
            systemEvent.on(SystemEvent.EventType.MOUSE_UP, this.onMouseUp, this);
            //this.node.on(Node.EventType.TOUCH_START, this.onTouchStartCallback, this, true);
            systemEvent.on(SystemEvent.EventType.TOUCH_START, this.onTouchStartCallback, this, false);
        } else {
            systemEvent.off(SystemEvent.EventType.MOUSE_UP, this.onMouseUp, this);
            // this.node.off(Node.EventType.TOUCH_START, this.onTouchStartCallback, this, true);
            systemEvent.off(SystemEvent.EventType.TOUCH_START, this.onTouchStartCallback, this);
        }
    }

    /**
     * 
     * @param touch 触摸回调
     * @param event 
     */
    onTouchStartCallback(touch:Touch, event:EventTouch){
        console.log('==>> touch start x:' + event.getLocationX() + ' y:' + event.getLocationY());
        console.log("==>> frame size width:", screen.windowSize.width, " height:", screen.windowSize.height);
        if(event.getLocationX() < screen.windowSize.width/2){
            this.jumpByStep(1);
        }else/* if(event.getLocationX() >= 2000)*/{
            this.jumpByStep(2);
        }
    }

    onMouseUp(event:EventMouse){
        console.log('==>> mouse up');
        if(event.getButton() == 0){
            this.jumpByStep(1);
        }else if(event.getButton() == 2){
            this.jumpByStep(2);
        }
    }

    jumpByStep(step:number){
        console.log('==>> jump step', step);
        if(this._startJump){
            return;
        }
        if (this.BodyAnim) {
            if (step === 1) {
                console.log("==>animation")
                this.BodyAnim.play('oneStep');
            } else if (step === 2) {
                this.BodyAnim.play('twoStep');
                console.log("==>> 2 step animation")
            }
        }else{
            console.log("==>> body animation is null")
        }
        this._startJump = true;
        this._jumpStep = step;
        this._curJumpTime = 0;
        this._curJumpSpeed = this._jumpStep/this._jumpTime;
        this.node.getPosition(this._curPos);
        Vec3.add(this._targetPos, this._curPos, new Vec3(this._jumpStep,0,0));

        this._curMoveIndex += step;
    }

    onOnceJumpEnd(){
        this.node.emit('JumpEnd', this._curMoveIndex);
    }

    reset(){
        this._curMoveIndex = 0;
    }

    update (deltaTime: number) {
        // console.log('==>> update');
        if(this._startJump){
            this._curJumpTime += deltaTime;
            if(this._curJumpTime > this._jumpTime){
                //end
                this.node.setPosition(this._targetPos);
                this._startJump = false;
                this.onOnceJumpEnd();
            }else{
                //tween
                this.node.getPosition(this._curPos);
                this._deltaPos.x = this._curJumpSpeed * deltaTime;
                Vec3.add(this._curPos, this._curPos, this._deltaPos);
                this.node.setPosition(this._curPos);
            }
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
