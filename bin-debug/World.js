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
        // 关卡旗帜集合
        _this.flagArr = [];
        _this.skinName = "resource/skins/world.exml";
        // 播放背景音乐
        SoundManager.playBgSound("mapbgsound");
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    World.prototype.onAddToStage = function () {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.guanka();
    };
    World.prototype.guanka = function () {
        TweenMax.to(this.backToIndex, 0.5, { delay: 1, y: 421, ease: Cubic.easeInOut });
        TweenMax.to(this.heroIcon, 0.5, { delay: 1, y: 397, ease: Cubic.easeInOut });
        this.backToIndex.touchEnabled = true;
        this.backToIndex.addEventListener(egret.TouchEvent.TOUCH_TAP, this.backRun, this);
        this.defalutFlag();
    };
    // 初始化关卡旗帜属性
    World.prototype.defalutFlag = function () {
        var _this = this;
        var arr = GuanKa.getData();
        arr.map(function (item, i) {
            // 该关卡已通关后颜色变化
            var flag = _this[item.name];
            if (flag) {
                if (item.ispass) {
                    flag.source = RES.getRes("flag1");
                }
                flag.touchEnabled = true;
                flag.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.choseGuanka, _this);
                _this.flagArr.push(flag);
                // 显示动画
                egret.Tween.get(flag).to({ alpha: 1, y: flag.y + 30 }, 300 + i * 0.1 + 1);
            }
        });
    };
    // 返回主界面
    World.prototype.backRun = function () {
        this.backToIndex.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.backRun, this);
        this.dispatchEvent(new MainEvent(MainEvent.OpenLoadBar, "welcomeload"));
        SoundManager.stopBgSound();
    };
    // 选择某个关卡
    World.prototype.choseGuanka = function () { };
    return World;
}(eui.Component));
__reflect(World.prototype, "World");
