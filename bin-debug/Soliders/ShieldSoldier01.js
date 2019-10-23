/**
 * 盾塔- 士兵小队--士兵类
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
var ShieldSoldier01 = (function (_super) {
    __extends(ShieldSoldier01, _super);
    function ShieldSoldier01() {
        return _super.call(this) || this;
    }
    return ShieldSoldier01;
}(ShieldSoldierBase));
__reflect(ShieldSoldier01.prototype, "ShieldSoldier01");
