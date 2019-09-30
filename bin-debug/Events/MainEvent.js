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
    function MainEvent(type, bubbles, cancelable, resName) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        if (resName === void 0) { resName = ""; }
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
    return MainEvent;
}(egret.Event));
__reflect(MainEvent.prototype, "MainEvent");
