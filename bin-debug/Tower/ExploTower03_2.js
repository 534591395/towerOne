/**
 * 炮塔-03_2
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
var ExploTower03_2 = (function (_super) {
    __extends(ExploTower03_2, _super);
    function ExploTower03_2() {
        var _this = _super.call(this) || this;
        _this.minRadius = 100;
        _this.maxRadius = 140;
        _this.ratioY = _this.minRadius / _this.maxRadius;
        _this.damage = 24;
        _this.view = new egret.MovieClip();
        _this.addChild(_this.view);
        var data = RES.getRes("ExploTower031json");
        var texture = RES.getRes("ExploTower031png");
        var mcf = new egret.MovieClipDataFactory(data, texture);
        _this.view.movieClipData = mcf.generateMovieClipData("ExploTower03_1");
        _this.view.anchorOffsetX = _this.view.width / 2;
        _this.view.x = _this.view.width / 2;
        _this.weaponClassName = 'Explo031';
        return _this;
    }
    ExploTower03_2.prototype.onEnterFrame = function (timeStamp) {
        _super.prototype.onEnterFrame.call(this, timeStamp);
        // 开火
        this.fire(timeStamp);
    };
    return ExploTower03_2;
}(ExploTowerBase));
__reflect(ExploTower03_2.prototype, "ExploTower03_2");
