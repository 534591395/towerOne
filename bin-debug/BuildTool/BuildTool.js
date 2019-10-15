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
        _this.width = 164;
        _this.height = 162;
        _this.createTools(obj);
        return _this;
    }
    BuildTool.prototype.createTools = function (obj) {
        // 选中的是地基类
        if (obj instanceof Foundation01) {
            // 箭塔
            this.addIcon("ArrowTower01", this.topLeftGroup);
            // 盾塔
            this.addIcon("ShieldTower01", this.topRightGroup);
            // 魔法塔
            this.addIcon("MagicTower01", this.bottomLeftGroup);
            // 炮塔
            this.addIcon("ExplodeTower01", this.bottomRightGroup);
        }
    };
    BuildTool.prototype.addIcon = function (type, direction) {
        var icon = new BuildIcon(type, this.gold);
        direction.addChild(icon);
        icon.touchEnabled = true;
        icon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleIconTouch, this);
    };
    // 点击建筑icon事件，触发自定义事件
    BuildTool.prototype.handleIconTouch = function (e) {
        // 该建筑建造的价格
        var price = e.currentTarget.price;
        // 判断用户当前关卡拥有的金币数大于建筑建造的价格
        if (this.gold >= price) {
            this.dispatchEvent(new ToolEvent(ToolEvent.BuildStart, e.currentTarget.className, price));
        }
    };
    // 隐藏工具
    BuildTool.prototype.hide = function () {
        this.parent.removeChild(this);
    };
    return BuildTool;
}(eui.Component));
__reflect(BuildTool.prototype, "BuildTool");
