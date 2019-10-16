/**
 * 箭塔--等级：一级， 地基为 ArrowTowerFoundation
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
var ArrowTower01 = (function (_super) {
    __extends(ArrowTower01, _super);
    function ArrowTower01() {
        var _this = _super.call(this) || this;
        _this.addChild(Utiles.createBitmapByName("ArrowTower01"));
        // 加入弓箭手
        _this.shooter01 = new ArrowShooter01();
        _this.shooter01.x = 36;
        _this.shooter01.y = 15;
        _this.addChild(_this.shooter01);
        _this.shooter02 = new ArrowShooter01();
        _this.shooter02.x = 50;
        _this.shooter02.y = 15;
        _this.addChild(_this.shooter02);
        return _this;
    }
    // 帧率执行回调方法
    ArrowTower01.prototype.onEnterFrame = function () {
        _super.prototype.onEnterFrame.call(this);
    };
    return ArrowTower01;
}(ArrowTowerFoundation));
__reflect(ArrowTower01.prototype, "ArrowTower01");
