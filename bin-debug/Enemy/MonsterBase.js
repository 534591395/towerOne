/**
 * 怪物基类
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
var MonsterBase = (function (_super) {
    __extends(MonsterBase, _super);
    function MonsterBase() {
        var _this = _super.call(this) || this;
        // 怪物是否被杀死标记
        _this.beKill = false;
        // 怪物是否被攻击
        _this.beAttack = false;
        // 申明状态机
        _this.fsm = new StateMachine(_this);
        // 血条
        _this.lifeBar = new LifeBar();
        _this.addChild(_this.lifeBar);
        return _this;
    }
    // 更新生命存活状态
    MonsterBase.prototype.changeLive = function () {
        if (this._hp <= 0) {
            this.fsm.changeState(stateType.deadState);
        }
        if (this._hp > this.life) {
            this._hp = this.life;
        }
    };
    Object.defineProperty(MonsterBase.prototype, "hp", {
        get: function () {
            return this._hp;
        },
        // 外部设置当前生命值后，执行
        set: function (value) {
            this._hp = value;
            this.changeLive();
            this.lifeBar.setProgress(this._hp, this.life);
        },
        enumerable: true,
        configurable: true
    });
    // 碰撞检测--怪物跟攻击目标之间
    MonsterBase.prototype.hittest = function () {
        if (this.target) {
            this.target.hp -= this.damage;
            if (this.target.hp <= 0) {
                this.target.target = null;
                this.target = null;
            }
        }
    };
    // 实时刷新
    MonsterBase.prototype.onEnterFrame = function (advancedTime) {
        // 累加时间-用来判断是否到了怪物攻击的时间
        this.timesum += advancedTime;
        // 刷新怪物状态
        this.fsm.onEnterFrame(advancedTime);
        // 移动（向量）
        _super.prototype.onEnterFrame.call(this, advancedTime);
    };
    return MonsterBase;
}(VectorElements));
__reflect(MonsterBase.prototype, "MonsterBase");
