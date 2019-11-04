/**
 * 盾塔-等级：三级-类型2--   士兵小队
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
var ShieldTower03_2 = (function (_super) {
    __extends(ShieldTower03_2, _super);
    function ShieldTower03_2() {
        var _this = _super.call(this) || this;
        _this.minRadius = 100;
        _this.maxRadius = 140;
        _this.ratioY = _this.minRadius / _this.maxRadius;
        _this.addChild(Utiles.createBitmapByName("ShieldTower03_2"));
        _this.soldierLife = 45;
        _this.soldierDamage = 8;
        return _this;
    }
    return ShieldTower03_2;
}(ShieldTowerBase));
__reflect(ShieldTower03_2.prototype, "ShieldTower03_2");
