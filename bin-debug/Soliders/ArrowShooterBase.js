/**
 * 弓箭手基类
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
var ArrowShooterBase = (function (_super) {
    __extends(ArrowShooterBase, _super);
    function ArrowShooterBase() {
        return _super.call(this) || this;
    }
    // 帧率执行回调
    ArrowShooterBase.prototype.onEnterFrame = function () {
        // 当前播放帧标签是结束标签，结束动画帧播放
        if (this.currentLabel === this.endLabel) {
            this.gotoAndStop(this.idleLabel);
        }
    };
    // 播放发射动画帧: direct 发射方向
    ArrowShooterBase.prototype.file = function (direct) {
        switch (direct) {
            case "downRight":
                this.startLabel = "shootDown";
                this.endLabel = "shootDownEnd";
                this.idleLabel = "idleDown";
                this.scaleX = 1;
                break;
            case "upRight":
                this.startLabel = "shootUp";
                this.endLabel = "shootUpEnd";
                this.idleLabel = "idleUp";
                this.scaleX = 1;
                break;
            case "downLeft":
                this.startLabel = "shootDown";
                this.endLabel = "shootDownEnd";
                this.idleLabel = "idleDown";
                this.scaleX = -1;
                break;
            case "upLeft":
                this.startLabel = "shootUp";
                this.endLabel = "shootUpEnd";
                this.idleLabel = "idleUp";
                this.scaleX = -1;
                break;
        }
        this.gotoAndPlay(this.startLabel);
    };
    return ArrowShooterBase;
}(egret.MovieClip));
__reflect(ArrowShooterBase.prototype, "ArrowShooterBase");
