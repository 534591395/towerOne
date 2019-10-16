/**
 * 场景中所有可被摧毁的对象的基类 塔除外
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
var Elements = (function (_super) {
    __extends(Elements, _super);
    function Elements() {
        var _this = _super.call(this) || this;
        // 敌人目标集合
        _this.targets = [];
        // 是否可清除
        _this.canClear = false;
        return _this;
    }
    // 创建
    Elements.prototype.onCreate = function () { };
    // 销毁
    Elements.prototype.onDestroy = function () {
        if (this && this.parent) {
            this.parent.removeChild(this);
        }
    };
    // 打击效果
    Elements.prototype.onHit = function () { };
    // 实时刷新
    Elements.prototype.onEnterFrame = function (advancedTime) { };
    // 移动
    Elements.prototype.move = function () { };
    return Elements;
}(egret.DisplayObjectContainer));
__reflect(Elements.prototype, "Elements");
