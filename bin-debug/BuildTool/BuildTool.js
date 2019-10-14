/**
 * 防御塔建造工具类
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
var BuildTool = (function (_super) {
    __extends(BuildTool, _super);
    function BuildTool(obj, gold) {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/skins/buildTool.exml";
        ;
        // 当前关卡拥有的金币
        _this.gold = gold;
        _this.createTools(obj);
        return _this;
    }
    BuildTool.prototype.createTools = function (obj) {
        // 选中的是地基类
        if (obj instanceof Foundation01) {
            this.addIcon("ArrowTower01", this.topLeftGroup);
        }
    };
    BuildTool.prototype.addIcon = function (type, direction) {
        var icon = new BuildIcon(type, this.gold);
        this.addChild(icon);
        icon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleIconTouch, this);
    };
    // 点击建筑icon事件，触发自定义事件
    BuildTool.prototype.handleIconTouch = function (e) {
    };
    return BuildTool;
}(eui.Component));
__reflect(BuildTool.prototype, "BuildTool");
