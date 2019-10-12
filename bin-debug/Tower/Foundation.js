/**
 * 地基的基类-- 添加防御塔的地基
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
var Foundation = (function (_super) {
    __extends(Foundation, _super);
    function Foundation() {
        return _super.call(this) || this;
    }
    Foundation.prototype.selectItem = function () { };
    Foundation.prototype.deselectItem = function () { };
    Foundation.prototype.reselectItem = function () { };
    return Foundation;
}(egret.DisplayObjectContainer));
__reflect(Foundation.prototype, "Foundation", ["InnerGroupItem"]);
