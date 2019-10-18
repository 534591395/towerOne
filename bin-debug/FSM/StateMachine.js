/**
 * 有限状态机
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// 枚举一些状态: 枚举语法文档-- https://www.tslang.cn/docs/handbook/enums.html
var stateType;
(function (stateType) {
    // 闲置中
    stateType[stateType["idleState"] = 0] = "idleState";
    // 移动
    stateType[stateType["moveState"] = 1] = "moveState";
    // 移动结束
    stateType[stateType["moveEndState"] = 2] = "moveEndState";
    // 战斗
    stateType[stateType["fightState"] = 3] = "fightState";
    // 战斗结束
    stateType[stateType["fightEndState"] = 4] = "fightEndState";
    // 死亡中
    stateType[stateType["deadState"] = 5] = "deadState";
    // 死亡结束
    stateType[stateType["deadEndState"] = 6] = "deadEndState";
})(stateType || (stateType = {}));
var StateMachine = (function () {
    function StateMachine(obj) {
        this.obj = obj;
    }
    // 改变状态
    StateMachine.prototype.changeState = function (state) {
        this._currentState = state;
    };
    // 实时刷新
    StateMachine.prototype.onEnterFrame = function (timeStamp) {
        switch (this._currentState) {
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
                if (this.obj.isDead()) {
                    this.obj.dying();
                }
                break;
            case stateType.deadEndState:
                this.obj.dyingEnd();
                break;
            default:
                break;
        }
    };
    Object.defineProperty(StateMachine.prototype, "currentState", {
        // 获取当前状态
        get: function () {
            return this._currentState;
        },
        enumerable: true,
        configurable: true
    });
    return StateMachine;
}());
__reflect(StateMachine.prototype, "StateMachine");
