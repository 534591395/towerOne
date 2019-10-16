/**
 * 武器弓箭01
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
var Arrow01 = (function (_super) {
    __extends(Arrow01, _super);
    function Arrow01() {
        var _this = _super.call(this) || this;
        _this.view = new egret.MovieClip();
        _this.addChild(_this.view);
        var data = RES.getRes("Arrow01json");
        var texture = RES.getRes("Arrow01png");
        var mcf = new egret.MovieClipDataFactory(data, texture);
        _this.view.movieClipData = mcf.generateMovieClipData("Arrow01");
        //设置数据属性
        _this.damage = 1;
        return _this;
    }
    Arrow01.prototype.init = function (p, tar, offy) {
        //设置目标状态
        this.x = p.x;
        this.y = p.y;
        this.p = p;
        this.target = tar;
        this.offy = offy;
        this.setTarget(this.target.x, this.target.y - this.offy);
        this.follow = true;
    };
    Arrow01.prototype.onCreate = function () {
        this.canClear = false;
        this.isHit = false;
        this.follow = false;
        this.isMiss = false;
        this.target = null;
        this.view.gotoAndStop(1);
        this.t0 = 0;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.pos = null;
    };
    Arrow01.prototype.onEnterFrame = function (timeStamp) {
        _super.prototype.onEnterFrame.call(this, timeStamp);
    };
    return Arrow01;
}(ArrowBase));
__reflect(Arrow01.prototype, "Arrow01");
