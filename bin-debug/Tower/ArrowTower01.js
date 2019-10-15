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
        return _this;
    }
    return ArrowTower01;
}(ArrowTowerFoundation));
__reflect(ArrowTower01.prototype, "ArrowTower01");
