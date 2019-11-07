/**
 * 魔法师种类1
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
var MagicWizard010203 = (function (_super) {
    __extends(MagicWizard010203, _super);
    function MagicWizard010203() {
        var _this = _super.call(this) || this;
        var data = RES.getRes("MagicWizard010203json");
        var texture = RES.getRes("MagicWizard010203png");
        var mcf = new egret.MovieClipDataFactory(data, texture);
        // 重新设置播放数据源
        _this.movieClipData = mcf.generateMovieClipData("MagicWizard010203");
        // 初始化播放帧标签
        _this.stateLabel = "idleDown";
        _this.idleLabel = "idleDown";
        _this.anchorOffsetX = _this.width / 2;
        return _this;
    }
    return MagicWizard010203;
}(MagicWizardBase));
__reflect(MagicWizard010203.prototype, "MagicWizard010203");
