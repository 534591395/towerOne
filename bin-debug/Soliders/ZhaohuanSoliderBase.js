/**
 * 玩家技能召唤出来的增援士兵 基类
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
var ZhaohuanSoliderBase = (function (_super) {
    __extends(ZhaohuanSoliderBase, _super);
    function ZhaohuanSoliderBase() {
        var _this = _super.call(this) || this;
        // 进入攻击范围的怪物集合
        _this.targets = [];
        // 申明状态机
        _this.fsm = new StateMachine(_this);
        // 血条
        _this.lifeBar = new LifeBar();
        _this.addChild(_this.lifeBar);
        return _this;
    }
    return ZhaohuanSoliderBase;
}(VectorElements));
__reflect(ZhaohuanSoliderBase.prototype, "ZhaohuanSoliderBase");
