/**
 * 炮弹01
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
var Explo01 = (function (_super) {
    __extends(Explo01, _super);
    function Explo01() {
        var _this = _super.call(this) || this;
        _this.view = new egret.MovieClip();
        _this.addChild(_this.view);
        var data = RES.getRes("Explo01json");
        var texture = RES.getRes("Explo01png");
        var mcf = new egret.MovieClipDataFactory(data, texture);
        _this.view.movieClipData = mcf.generateMovieClipData("Explo01");
        _this.view.anchorOffsetX = _this.view.width / 2;
        return _this;
    }
    return Explo01;
}(ExploBase));
__reflect(Explo01.prototype, "Explo01");
