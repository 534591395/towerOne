/**
 * 主类事件--游戏主线路自定义事件
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
var MainEvent = (function (_super) {
    __extends(MainEvent, _super);
    function MainEvent(type, resName, bubbles, cancelable) {
        if (resName === void 0) { resName = ""; }
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        var _this = _super.call(this, type, bubbles, cancelable) || this;
        _this._resName = "";
        _this._resName = resName;
        return _this;
    }
    Object.defineProperty(MainEvent.prototype, "resName", {
        get: function () {
            return this._resName;
        },
        enumerable: true,
        configurable: true
    });
    // 触发游戏开始时调用该事件类型
    MainEvent.GameStart = '游戏开始';
    MainEvent.OpenLoadBar = '打开场景加载进度条';
    MainEvent.StartLoadBar = '开始加载资源';
    MainEvent.LoadAnimateComplete = '资源加载完成，动画播放结束';
    return MainEvent;
}(egret.Event));
__reflect(MainEvent.prototype, "MainEvent");
