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
        // 是否跟踪目标
        _this.follow = false;
        _this.fsm = new StateMachine(_this);
        return _this;
    }
    MagicBulletBase.prototype.hittest = function () {
        if (HitTest.hitTestRect(this, this.target)) {
            this.target.hp -= this.damage;
            this.isHit = true;
            this.follow = false;
        }
    };
    MagicBulletBase.prototype.onEnterFrame = function (timeStamp) {
        _super.prototype.onEnterFrame.call(this, timeStamp);
        this.rotation = this.angle;
        this.fsm.onEnterFrame(timeStamp);
    };
    return MagicBulletBase;
}(VectorElements));
__reflect(MagicBulletBase.prototype, "MagicBulletBase");
