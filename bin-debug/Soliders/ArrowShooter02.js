/**
 * 弓箭手02  动画
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
var ArrowShooter02 = (function (_super) {
    __extends(ArrowShooter02, _super);
    function ArrowShooter02() {
        var _this = _super.call(this) || this;
        // 锚点居中,士兵 width = 20。
        _this.anchorOffsetX = 10;
        var data = RES.getRes("ArrowShooter02json");
        var texture = RES.getRes("ArrowShooter02png");
        var mcf = new egret.MovieClipDataFactory(data, texture);
        // 重新设置播放数据源
        _this.movieClipData = mcf.generateMovieClipData("ArrowShooter02");
        // 初始化播放帧标签
        _this.startLabel = "";
        _this.endLabel = "";
        _this.idleLabel = "idleDown";
        return _this;
    }
    return ArrowShooter02;
}(ArrowShooterBase));
__reflect(ArrowShooter02.prototype, "ArrowShooter02");
