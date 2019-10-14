/**
 * 建筑工具相关自定义事件
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
var ToolEvent = (function (_super) {
    __extends(ToolEvent, _super);
    function ToolEvent(type, className, price, bubbles, cancelable) {
        if (className === void 0) { className = ""; }
        if (price === void 0) { price = 0; }
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        var _this = _super.call(this, type, bubbles, cancelable) || this;
        _this._price = 0;
        _this._className = '';
        _this._className = className;
        _this._price = price;
        return _this;
    }
    Object.defineProperty(ToolEvent.prototype, "className", {
        get: function () {
            return this._className;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToolEvent.prototype, "price", {
        get: function () {
            return this._price;
        },
        enumerable: true,
        configurable: true
    });
    ToolEvent.BuildStart = "开始建筑";
    ToolEvent.BuildComplete = "建筑完成";
    return ToolEvent;
}(egret.Event));
__reflect(ToolEvent.prototype, "ToolEvent");
