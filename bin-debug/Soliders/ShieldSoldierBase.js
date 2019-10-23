/**
 * 盾塔- 士兵小队--士兵基类
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
var ShieldSoldierBase = (function (_super) {
    __extends(ShieldSoldierBase, _super);
    function ShieldSoldierBase() {
        return _super.call(this) || this;
    }
    return ShieldSoldierBase;
}(VectorElements));
__reflect(ShieldSoldierBase.prototype, "ShieldSoldierBase");
