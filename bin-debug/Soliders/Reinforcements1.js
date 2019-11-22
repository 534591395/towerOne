/**
 * 玩家技能召唤出来的增援士兵 类型1
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
var Reinforcements1 = (function (_super) {
    __extends(Reinforcements1, _super);
    function Reinforcements1() {
        var _this = _super.call(this) || this;
        _this.addTexture();
        return _this;
    }
    Reinforcements1.prototype.addTexture = function () {
        //获取贴图
        var data = RES.getRes("ZenYuan1json");
        var texture = RES.getRes("ZenYuan1png");
        var mcf = new egret.MovieClipDataFactory(data, texture);
        this.view.movieClipData = mcf.generateMovieClipData("ZenYuan1");
        this.view.x = this.view.width / 2;
        this.view.anchorOffsetX = this.view.width / 2;
        //血条位置
        this.lifeBar.x = 27;
        this.lifeBar.y = 5;
        this.maxSpeed = 0.6;
        this.fireDelay = 1000;
    };
    return Reinforcements1;
}(ReinforcementsBase));
__reflect(Reinforcements1.prototype, "Reinforcements1");
