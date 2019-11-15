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
/**
 * 技能：火球
 */
var FireBall = (function (_super) {
    __extends(FireBall, _super);
    function FireBall() {
        var _this = _super.call(this) || this;
        _this.ratioSoldY = _this.minSoldRadius / _this.maxSoldRadius;
        _this.view = new egret.MovieClip();
        _this.addChild(_this.view);
        var data = RES.getRes("stone1json");
        var texture = RES.getRes("stone1png");
        var mcf = new egret.MovieClipDataFactory(data, texture);
        _this.view.movieClipData = mcf.generateMovieClipData("stone1");
        _this.view.x = _this.view.width / 2;
        return _this;
    }
    FireBall.prototype.init = function (xnum, ynum) {
        this.p = new egret.Point(xnum, ynum);
        this.position.x = this.x = xnum;
        this.position.y = this.y = ynum - 480;
        this.setPositionArr();
    };
    FireBall.prototype.onEnterFrame = function (timeStamp) {
        _super.prototype.onEnterFrame.call(this, timeStamp);
    };
    FireBall.prototype.onCreate = function () { };
    return FireBall;
}(FireBallBase));
__reflect(FireBall.prototype, "FireBall");
