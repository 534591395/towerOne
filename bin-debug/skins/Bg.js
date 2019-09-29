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
var Bg = (function (_super) {
    __extends(Bg, _super);
    function Bg() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/skins/bg.exml";
        _this.animate();
        return _this;
    }
    Bg.prototype.animate = function () {
        var _this = this;
        // 点击开始触发动画效果
        this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.start.play(0);
        }, this);
        // 动画播放结束监听
        this.start.addEventListener('complete', function () { }, this);
    };
    return Bg;
}(eui.Component));
__reflect(Bg.prototype, "Bg");
