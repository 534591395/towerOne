/**
 * 世界地图类（关卡选择界面）
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
var World = (function (_super) {
    __extends(World, _super);
    function World() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/skins/world.exml";
        // 播放背景音乐
        SoundManager.playBgSound("mapbgsound");
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
        //this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
    }
    World.prototype.onAddToStage = function () {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        //this.removeEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
        this.guanka();
    };
    World.prototype.guanka = function () {
        TweenMax.to(this.backToIndex, 0.5, { delay: 1, y: 421, ease: Cubic.easeInOut });
        TweenMax.to(this.heroIcon, 0.5, { delay: 1, y: 397, ease: Cubic.easeInOut });
    };
    return World;
}(eui.Component));
__reflect(World.prototype, "World");
