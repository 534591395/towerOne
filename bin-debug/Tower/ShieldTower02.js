/**
 * 盾塔-等级：二级--   士兵小队
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
var ShieldTower02 = (function (_super) {
    __extends(ShieldTower02, _super);
    function ShieldTower02() {
        var _this = _super.call(this) || this;
        _this.minRadius = 100;
        _this.maxRadius = 140;
        _this.ratioY = _this.minRadius / _this.maxRadius;
        _this.addChild(Utiles.createBitmapByName("ShieldTower02"));
        _this.soldierLife = 25;
        _this.soldierDamage = 4;
        return _this;
    }
    return ShieldTower02;
}(ShieldTowerBase));
__reflect(ShieldTower02.prototype, "ShieldTower02");
