var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * 技能：火球基类
 */
var FireBallBase = (function (_super) {
    __extends(FireBallBase, _super);
    function FireBallBase() {
        var _this = _super.call(this) || this;
        /**攻击范围最大半径*/
        _this.maxSoldRadius = 40;
        /**攻击范围最小半径*/
        _this.minSoldRadius = 30;
        /**是否击中目标*/
        _this.isHit = false;
        /**是否运行过程中*/
        _this.isTravel = false;
        _this.fsm = new StateMachine(_this);
        return _this;
    }
    FireBallBase.prototype.onEnterFrame = function (timeStamp) {
        _super.prototype.onEnterFrame.call(this, timeStamp);
        this.fsm.onEnterFrame(timeStamp);
        // 一开始就播放运行动画，火球是发射出去了
        if (this.isTravel) {
            this.view.gotoAndPlay("travel");
            this.isTravel = false;
        }
        // 若当前动画label是运行结束，重新开始播放运行中
        if (this.view.currentLabel === "travelEnd") {
            this.view.gotoAndPlay("travel");
        }
        // 击中敌人后，播放击中动画
        if (this.isHit) {
            this.view.gotoAndPlay("hit");
            this.isHit = false;
        }
        // 若当前动画label是击中敌人结束，表示当前魔法弹可以销毁
        if (this.view.currentLabel === "hitEnd") {
            this.canClear = true;
        }
        if (this.canClear) {
            ObjectPool.getInstance().destroyObject(this);
        }
    };
    FireBallBase.prototype.setPositionArr = function () {
        this.pathIndex = 0;
        this.positionArr = [];
        // 魔法弹的攻击路径向量点
        var v2d = new Vector2D(this.p.x, this.p.y);
        this.positionArr.push(v2d);
        this.fsm.changeState(stateType.moveState);
    };
    FireBallBase.prototype.hittest = function () {
        var _this = this;
        var disx = this.x - this.p.x < 0 ? this.p.x - this.x : this.x - this.p.x;
        var disy = this.y - this.p.y < 0 ? this.p.y - this.y : this.y - this.p.y;
        //精确到1个像素内
        if (disx <= 1 && disy <= 1) {
            // 进入攻击范围的敌人
            this.atargets = [];
            this.targets.map(function (item) {
                var isIn = Utiles.containsXY(item.x, item.y, _this.x, _this.x, _this.maxSoldRadius, _this.ratioSoldY);
                var index = _this.atargets.indexOf(item);
                if (isIn && item.hp > 0) {
                    if (index === -1) {
                        _this.atargets.push(item);
                    }
                }
                else {
                    // 已经不在该塔的攻击范围内
                    if (index > -1) {
                        _this.atargets.splice(index, 1);
                    }
                }
            });
            this.atargets.map(function (item) {
                item.hp -= _this.damage;
            });
            this.isHit = true;
            //
            //SoundManager.playEffect("explo_fireend1");
        }
    };
    /**移动完毕，触发碰撞检测 */
    FireBallBase.prototype.movingEnd = function () {
        if (this.currentState !== stateType.moveEndState) {
            this.currentState = stateType.moveEndState;
            this.fsm.changeState(stateType.idleState);
            this.hittest();
        }
    };
    /** 移动中，状态机里调用 */
    FireBallBase.prototype.moving = function () {
        if (this.currentState !== stateType.moveState) {
            this.currentState = stateType.moveState;
        }
    };
    /**闲置中 */
    FireBallBase.prototype.idling = function () {
        if (this.currentState !== stateType.idleState) {
            this.currentState = stateType.idleState;
        }
    };
    /**闲置 -- 状态机里执行*/
    FireBallBase.prototype.isIdle = function () {
        return true;
    };
    /**移动 -- 状态机里执行*/
    FireBallBase.prototype.isMove = function () {
        return true;
    };
    return FireBallBase;
}(VectorElements));
__reflect(FireBallBase.prototype, "FireBallBase");
