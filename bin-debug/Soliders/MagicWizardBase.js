/**
 * 魔法师基类
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
var MagicWizardBase = (function (_super) {
    __extends(MagicWizardBase, _super);
    function MagicWizardBase() {
        return _super.call(this) || this;
    }
    // 帧率执行回调
    MagicWizardBase.prototype.onEnterFrame = function (timeStamp) {
        this.checkLastEnd(this.stateLabel, this.currentFrame);
    };
    // 播放发射动画帧: direct 发射方向
    MagicWizardBase.prototype.fire = function (direct) {
        switch (direct) {
            case "down":
                this.stateLabel = "shoot_down";
                this.idleLabel = "idleDown";
                break;
            case "up":
                this.stateLabel = "shoot_up";
                this.idleLabel = "idleUp";
                break;
        }
        this.gotoAndPlay(this.stateLabel);
    };
    /**
     * 播放结束检查
     */
    MagicWizardBase.prototype.checkLastEnd = function (str, currentFrame) {
        var nextFrameNum = currentFrame + 1;
        var movieClipData = this.movieClipData;
        var mz = Utiles.getFrameLable(movieClipData, nextFrameNum);
        if (mz != str || currentFrame >= this.totalFrames) {
            // 动画状态改为闲置状态, 将播放头移到指定帧并停止
            this.gotoAndStop(this.idleLabel);
        }
    };
    return MagicWizardBase;
}(egret.MovieClip));
__reflect(MagicWizardBase.prototype, "MagicWizardBase");
