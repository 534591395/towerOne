/**
 * 建筑等待动画
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
var BuildWait = (function (_super) {
    __extends(BuildWait, _super);
    function BuildWait(towerName, index) {
        var _this = _super.call(this) || this;
        // 建筑塔类型-- 根据该类型名来确定显示的建筑底部ui
        _this.buildType = { "ArrowTower01": "building1", "ShieldTower01": "building2", "MagicTower01": "building3", "ExploTower01": "building4" };
        _this.index = index;
        _this.addChild(Utiles.createBitmapByName(_this.buildType[towerName]));
        // 进度条-未开始的，打底的
        var barbg = Utiles.createBitmapByName("buildbarbg");
        barbg.x = 23;
        barbg.y = 23;
        _this.addChild(barbg);
        // 进度条-开始中的，显示进度的
        var barbgTop = Utiles.createBitmapByName("buildbartop");
        barbgTop.x = 24;
        barbgTop.y = 24;
        barbgTop.width = 1;
        _this.barbgTop = barbgTop;
        _this.addChild(_this.barbgTop);
        _this.building();
        // 播放建筑音效
        SoundManager.playEffect("building");
        return _this;
    }
    // 建筑动画
    BuildWait.prototype.building = function () {
        var _this = this;
        TweenLite.to(this.barbgTop, 1.5, { width: 37, ease: Linear.easeNone, onComplete: function () {
                _this.dispatchEvent(new ToolEvent(ToolEvent.BuildComplete));
            } });
    };
    return BuildWait;
}(egret.DisplayObjectContainer));
__reflect(BuildWait.prototype, "BuildWait");
