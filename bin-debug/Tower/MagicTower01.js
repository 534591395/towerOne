/**
 * 魔法塔-01
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
var MagicTower01 = (function (_super) {
    __extends(MagicTower01, _super);
    function MagicTower01() {
        var _this = _super.call(this) || this;
        _this.minRadius = 100;
        _this.maxRadius = 140;
        _this.ratioY = _this.minRadius / _this.maxRadius;
        _this.anchorOffsetX = _this.width / 2;
        _this.addChild(Utiles.createBitmapByName("MagicTower01"));
        _this.damage = 7;
        // 加入魔法师
        _this.shooter = new MagicWizard010203();
        _this.shooter.x = 43;
        _this.shooter.y = 6;
        _this.addChild(_this.shooter);
        return _this;
    }
    MagicTower01.prototype.onEnterFrame = function (timeStamp) {
        _super.prototype.onEnterFrame.call(this, timeStamp);
        this.shooter.onEnterFrame(timeStamp);
        // 开火
        this.fire(timeStamp);
    };
    return MagicTower01;
}(MagicTowerBase));
__reflect(MagicTower01.prototype, "MagicTower01");
