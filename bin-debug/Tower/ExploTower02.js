/**
 * 炮塔-02
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
var ExploTower02 = (function (_super) {
    __extends(ExploTower02, _super);
    function ExploTower02() {
        var _this = _super.call(this) || this;
        _this.minRadius = 100;
        _this.maxRadius = 140;
        _this.ratioY = _this.minRadius / _this.maxRadius;
        _this.damage = 12;
        _this.view = new egret.MovieClip();
        _this.addChild(_this.view);
        var data = RES.getRes("ExploTower02json");
        var texture = RES.getRes("ExploTower02png");
        var mcf = new egret.MovieClipDataFactory(data, texture);
        _this.view.movieClipData = mcf.generateMovieClipData("ExploTower02");
        _this.view.anchorOffsetX = _this.view.width / 2;
        _this.view.x = _this.view.width / 2;
        _this.weaponClassName = 'Explo02';
        return _this;
    }
    ExploTower02.prototype.onEnterFrame = function (timeStamp) {
        _super.prototype.onEnterFrame.call(this, timeStamp);
        // 开火
        this.fire(timeStamp);
    };
    return ExploTower02;
}(ExploTowerBase));
__reflect(ExploTower02.prototype, "ExploTower02");
