/**
 * 有限状态机
 */

// 枚举一些状态: 枚举语法文档-- https://www.tslang.cn/docs/handbook/enums.html
enum stateType {
    // 闲置中
    idleState,
    // 移动
    moveState,
    // 移动结束
    moveEndState,
    // 战斗
    fightState,
    // 战斗结束
    fightEndState,
    // 死亡中
    deadState,
    // 死亡结束
    deadEndState
}

class StateMachine {
    // 当前状态
    private _currentState: stateType;
    // 对象
    private obj: any;

    public constructor(obj: any) {
        this.obj = obj;
    }

    // 改变状态
    public changeState(state: stateType):void {
        this._currentState = state;
    }

    // 实时刷新
    public onEnterFrame(timeStamp:number) {
        switch(this._currentState) {
            case stateType.idleState:
               if (this.obj.isIdle()) {
                   this.obj.idling();
               }
               break;
            case stateType.moveState:
               if (this.obj.isMove()) {
                   this.obj.moving();
               }   
               break;
            case stateType.moveEndState:
               this.obj.movingEnd();
               break;
            case stateType.fightState:
               if (this.obj.isFighting()) {
                   this.obj.fighting();
               }      
               break;
            case stateType.fightEndState:
               this.obj.fightingEnd();
               break;
            case stateType.deadState:
                if(this.obj.isDead()) {  
                    this.obj.dying();
                }
                break;
            case stateType.deadEndState:
                this.obj.dyingEnd();
                break;
            default: 
               break;
        }
    }

    // 获取当前状态
    public get currentState(): stateType {
        return this._currentState;
    }

}