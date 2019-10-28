/**
 * 士兵相关自定义事件
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
var SoldierEvent = (function (_super) {
    __extends(SoldierEvent, _super);
    function SoldierEvent(type, obj, arr, bubbles, cancelable) {
        if (obj === void 0) { obj = null; }
        if (arr === void 0) { arr = null; }
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        var _this = _super.call(this, type, bubbles, cancelable) || this;
        _this._obj = obj;
        _this._arr = arr;
        return _this;
    }
    Object.defineProperty(SoldierEvent.prototype, "obj", {
        get: function () {
            return this._obj;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SoldierEvent.prototype, "arr", {
        get: function () {
            return this._arr;
        },
        enumerable: true,
        configurable: true
    });
    SoldierEvent.Select = '选中';
    SoldierEvent.Deselect = '取消选中';
    SoldierEvent.Move = '移动';
    return SoldierEvent;
}(egret.Event));
__reflect(SoldierEvent.prototype, "SoldierEvent");
