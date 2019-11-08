/**
 * 魔法弹基类,魔法弹攻击轨迹跟箭不一样，不遵循物理规则，是一种类似AI运行轨迹
 */
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
var MagicBulletBase = (function (_super) {
    __extends(MagicBulletBase, _super);
    function MagicBulletBase() {
        var _this = _super.call(this) || this;
        // 是否击中目标
        _this.isHit = false;
        // 是否失去目标
        _this.isMiss = false;
        // 是否跟踪目标
        _this.follow = false;
        /**第一次触发运行动画的标记 */
        _this.isTravel = false;
        _this.fsm = new StateMachine(_this);
        return _this;
    }
    MagicBulletBase.prototype.hittest = function () {
        if (HitTest.hitTestRect(this, this.target)) {
            this.target.hp -= this.damage;
            if (this.target.hp <= -this.damage) {
                this.isMiss = true; //插地效果
                this.rotation = 270;
                //x,y坐标随机偏移几像素
                var dx = 2 - Math.random() * 4;
                var dy = Math.random() * 6 + 4;
                this.x += dx;
                this.y += dy;
            }
            else {
                this.isHit = true;
            }
            //this.isHit = true;
            this.follow = false;
        }
    };
    MagicBulletBase.prototype.setPositionArr = function () {
        this.pathIndex = 0;
        this.positionArr = [];
        // 魔法弹的攻击路径向量点
        var v2d = new Vector2D(this.target.x, this.target.y - this.target.offy);
        this.positionArr.push(v2d);
        this.fsm.changeState(stateType.moveState);
    };
    MagicBulletBase.prototype.onEnterFrame = function (timeStamp) {
        _super.prototype.onEnterFrame.call(this, timeStamp);
        this.rotation = this.angle;
        this.fsm.onEnterFrame(timeStamp);
        // 一开始就播放运行动画，毕竟魔法弹是发射出去了
        if (this.isTravel) {
            this.view.gotoAndPlay("travel");
            this.isTravel = false;
        }
        // 若当前动画label是运行结束，重新开始播放运行中
        if (this.view.currentLabel === "travelEnd") {
            this.view.gotoAndPlay("travel");
        }
        // 击中敌人后，播放击中动画
        if (this.isHit || this.isMiss) {
            this.view.gotoAndPlay("hit");
            this.isHit = false;
            this.isMiss = false;
        }
        // 若当前动画label是击中敌人结束，表示当前魔法弹可以销毁
        if (this.view.currentLabel === "hitEnd") {
            this.canClear = true;
        }
        //销毁
        if (this.canClear) {
            ObjectPool.getInstance().destroyObject(this);
        }
    };
    /**移动完毕，触发碰撞检测 */
    MagicBulletBase.prototype.movingEnd = function () {
        if (this.currentState !== stateType.moveEndState) {
            this.currentState = stateType.moveEndState;
            this.fsm.changeState(stateType.idleState);
            this.hittest();
        }
    };
    /** 移动中，状态机里调用，同时随着敌人走动实时调整攻击路径 */
    MagicBulletBase.prototype.moving = function () {
        if (this.currentState !== stateType.moveState) {
            this.currentState = stateType.moveState;
        }
        // 敌人是实时走动的，故需要更新路径
        this.setPositionArr();
    };
    /**闲置中 */
    MagicBulletBase.prototype.idling = function () {
        if (this.currentState !== stateType.idleState) {
            this.currentState = stateType.idleState;
        }
    };
    /**闲置 -- 状态机里执行*/
    MagicBulletBase.prototype.isIdle = function () {
        return true;
    };
    /**移动 -- 状态机里执行*/
    MagicBulletBase.prototype.isMove = function () {
        return true;
    };
    return MagicBulletBase;
}(VectorElements));
__reflect(MagicBulletBase.prototype, "MagicBulletBase");
