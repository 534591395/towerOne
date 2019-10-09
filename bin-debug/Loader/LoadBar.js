/**
 * 场景资源加载进度条
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
var LoadBar = (function (_super) {
    __extends(LoadBar, _super);
    function LoadBar() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/skins/loadbar.exml";
        // 给左右多余的加载条上添加蒙层隐藏起来
        _this.loadLeftGroup.mask = new egret.Rectangle(0, 0, 99, 36);
        _this.loadRightGroup.mask = new egret.Rectangle(99, 0, 99, 36);
        _this.showLoadBar();
        return _this;
    }
    LoadBar.prototype.onProgress = function (current, total) {
        //this.textField.text = `Loading...${current}/${total}`;
        //this.loading.width = (current/total) * 428;
    };
    // 开始加载，合拢动画
    LoadBar.prototype.showLoadBar = function () {
        var _this = this;
        TweenMax.to(this.leftGroup, 0.3, { x: 0, ease: Cubic.easeOut });
        TweenMax.to(this.rightGroup, 0.3, { x: 400, ease: Cubic.easeOut, onComplete: function () {
                setTimeout(function () {
                    _this.hideLoader();
                }, 1000);
            } });
        // 播放合拢音效
        SoundManager.playEffect("loaderClose");
    };
    // 加载完毕，展开动画
    LoadBar.prototype.hideLoader = function () {
        TweenMax.to(this.leftGroup, 0.3, { delay: 0.6, x: -400, ease: Cubic.easeOut });
        TweenMax.to(this.rightGroup, 0.3, { delay: 0.6, x: 800, ease: Cubic.easeOut, onComplete: function () {
                // 播放展开音效
                SoundManager.playEffect("loaderOpen");
            } });
    };
    return LoadBar;
}(eui.Component));
__reflect(LoadBar.prototype, "LoadBar", ["RES.PromiseTaskReporter"]);
