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
    // 选中
    Foundation.prototype.selectItem = function () {
        this.dispatchEvent(new TowerEvent(TowerEvent.ShowTool, this));
    };
    // 取消
    Foundation.prototype.deselectItem = function () {
        this.dispatchEvent(new TowerEvent(TowerEvent.HideTool, this));
    };
    // 重置
    Foundation.prototype.reselectItem = function () {
        this.dispatchEvent(new TowerEvent(TowerEvent.HideTool, this));
        Group.dispose();
    };
    return Foundation;
}(egret.DisplayObjectContainer));
__reflect(Foundation.prototype, "Foundation", ["InnerGroupItem"]);
