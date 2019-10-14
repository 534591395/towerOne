/**
 * 防御塔相关自定义事件
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
var TowerEvent = (function (_super) {
    __extends(TowerEvent, _super);
    function TowerEvent(type, obj, bubbles, cancelable) {
        if (obj === void 0) { obj = null; }
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        var _this = _super.call(this, type, bubbles, cancelable) || this;
        _this._obj = obj;
        return _this;
    }
    Object.defineProperty(TowerEvent.prototype, "obj", {
        get: function () {
            return this._obj;
        },
        enumerable: true,
        configurable: true
    });
    TowerEvent.ShowTool = '显示创建防御塔的UI';
    TowerEvent.HideTool = '隐藏创建防御塔的UI';
    return TowerEvent;
}(egret.Event));
__reflect(TowerEvent.prototype, "TowerEvent");
