/**
 * 关卡基类
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
var GuankaBase = (function (_super) {
    __extends(GuankaBase, _super);
    function GuankaBase() {
        var _this = _super.call(this) || this;
        // 地基坐标集合
        _this.foundationPosiotionArr = [];
        // 地基实例集合
        _this.foundationArr = [];
        // 背景图片
        _this.backgroundImage = new egret.Bitmap();
        _this.addChild(_this.backgroundImage);
        // 地基层
        _this.uiFoundation = new egret.DisplayObjectContainer();
        _this.addChild(_this.uiFoundation);
        _this.uiLayer = new egret.DisplayObjectContainer();
        _this.addChild(_this.uiLayer);
        return _this;
    }
    // 生成UI特效层、提示层
    GuankaBase.prototype.createUI = function () {
        this.guankaUI = new GuankaUI();
        this.uiLayer.addChild(this.guankaUI);
        this.uiLayer.addEventListener(MainEvent.QuitGuanka, this.handleBackToWorld, this);
    };
    // 退出关卡，回到事件地图界面
    GuankaBase.prototype.handleBackToWorld = function () {
        this.dispatchEvent(new MainEvent(MainEvent.OpenLoadBar, "maps"));
    };
    // 创建地基，标记可以造箭塔的位置
    GuankaBase.prototype.createFoundation = function (classFactory) {
        var _this = this;
        this.foundationPosiotionArr.map(function (item, i) {
            var foundation = new classFactory();
            foundation.x = item[0];
            foundation.y = item[1];
            foundation.index = i;
            _this.uiFoundation.addChild(foundation);
            _this.foundationArr.push(foundation);
            foundation.touchEnabled = true;
        });
    };
    return GuankaBase;
}(eui.Component));
__reflect(GuankaBase.prototype, "GuankaBase");
