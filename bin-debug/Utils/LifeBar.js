/**
 * 血条
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
var LifeBar = (function (_super) {
    __extends(LifeBar, _super);
    function LifeBar() {
        var _this = _super.call(this) || this;
        var bg = Utiles.createBitmapByName("lifeBarBg");
        _this.addChild(bg);
        var bar = Utiles.createBitmapByName("lifeBar");
        _this.addChild(bar);
        bar.x = bar.y = 1;
        // 启动纹理缓存
        _this.cacheAsBitmap = true;
        _this.bar = bar;
        return _this;
    }
    // 血条--扣血进度展示  hp 当前生命值 life 总生命值
    LifeBar.prototype.setProgress = function (hp, life) {
        var num = (hp / life) * 18;
        var per = num < 0 ? 0 : num;
        this.bar.width = per;
    };
    // 重置血条
    LifeBar.prototype.reset = function () {
        this.bar.width = 18;
    };
    return LifeBar;
}(egret.DisplayObjectContainer));
__reflect(LifeBar.prototype, "LifeBar");
