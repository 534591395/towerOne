/**
 * 建筑工具的icon类（对应的图标）
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
var BuildIcon = (function (_super) {
    __extends(BuildIcon, _super);
    function BuildIcon(towerName, gold) {
        var _this = _super.call(this) || this;
        _this.gold = gold;
        // 资源配置
        var towerConfig = TowerLevel.data[towerName];
        _this.className = towerConfig.className;
        _this.price = towerConfig.price;
        // 添加图片资源图标
        _this.addChild(Utiles.createBitmapByName(towerConfig.res));
        return _this;
    }
    return BuildIcon;
}(egret.DisplayObjectContainer));
__reflect(BuildIcon.prototype, "BuildIcon");
