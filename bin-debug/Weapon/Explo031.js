/**
 * 炮弹031
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
var Explo031 = (function (_super) {
    __extends(Explo031, _super);
    function Explo031() {
        var _this = _super.call(this) || this;
        _this.view = new egret.MovieClip();
        _this.addChild(_this.view);
        var data = RES.getRes("Explo031json");
        var texture = RES.getRes("Explo31png");
        var mcf = new egret.MovieClipDataFactory(data, texture);
        _this.view.movieClipData = mcf.generateMovieClipData("Explo03_1");
        _this.view.anchorOffsetX = _this.view.width / 2;
        return _this;
    }
    return Explo031;
}(ExploBase));
__reflect(Explo031.prototype, "Explo031");
