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
        // 关于这边层的使用说明：通过层来控制显示顺序，以及显示分类
        // UI特效层、提示层
        _this.uiLayer = new egret.DisplayObjectContainer();
        _this.addChild(_this.uiLayer);
        // 地基层
        _this.foundationLayer = new egret.DisplayObjectContainer();
        _this.addChild(_this.foundationLayer);
        // 建造工具层
        _this.toolLayer = new egret.DisplayObjectContainer();
        _this.addChild(_this.toolLayer);
        return _this;
    }
    // 生成UI特效层、提示层
    GuankaBase.prototype.createUI = function () {
        this.guankaUI = new GuankaUI();
        this.backgroundImage = this.guankaUI.backgroundImage;
        this.backgroundImage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.bgTouch, this);
        this.uiLayer.addChild(this.guankaUI);
        this.uiLayer.addEventListener(MainEvent.QuitGuanka, this.handleBackToWorld, this);
    };
    // 退出关卡，回到事件地图界面
    GuankaBase.prototype.handleBackToWorld = function () {
        this.dispatchEvent(new MainEvent(MainEvent.OpenLoadBar, "maps"));
    };
    GuankaBase.prototype.bgTouch = function (e) {
    };
    // 创建地基，标记可以造箭塔的位置
    GuankaBase.prototype.createFoundation = function (classFactory) {
        var _this = this;
        this.foundationPosiotionArr.map(function (item, i) {
            // 地基
            var foundation = new classFactory();
            foundation.x = item[0];
            foundation.y = item[1];
            foundation.index = i;
            _this.foundationLayer.addChild(foundation);
            _this.foundationArr.push(foundation);
            foundation.touchEnabled = true;
            // 监听触摸事件
            foundation.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.foundationOrTowerTouch, _this);
            // 自定义事件
            foundation.addEventListener(TowerEvent.ShowTool, _this.showTool, _this);
            foundation.addEventListener(TowerEvent.HideTool, _this.hideTool, _this);
        });
    };
    // 地基被点击
    GuankaBase.prototype.foundationOrTowerTouch = function (e) {
        Group.selectItem(e.currentTarget);
    };
    // 显示建造防御塔的选项工具ui
    GuankaBase.prototype.showTool = function (e) {
        // touchObj: 某个地基、某个防御塔
        var touchObj = e.currentTarget;
        this.tool = new BuildTool(touchObj, this.gold);
        /**
         * 公式推导：
         * this.tool的中点坐标移到touchObj的中点坐标， 先求出 touchObj的中点坐标--(touchObj.x + touchObj.width/2)，赋值给this.tool（记为坐标A(Ax, Ay) = (this.tool.x, this.tool.y)），然后求出this.tool的中点坐标记为坐标B(Bx, By) = (Ax+(this.tool.width/2), Ay+(this.tool.height/2)) ；要将中点B移到坐标A，移动距离A'(A'x, A'y) = (Bx-Ax, By-Ay) = (this.tool.width/2, this.tool.height/2);
         * 故最终this.tool的坐标为：( Ax- A'x, Ay- A'y )
         */
        this.tool.x = (touchObj.x + touchObj.width / 2) - this.tool.width / 2;
        this.tool.y = (touchObj.y + touchObj.height / 2) - this.tool.height / 2;
        this.toolLayer.addChild(this.tool);
        this.tool.addEventListener(ToolEvent.BuildStart, this.buildStart, this);
        this.selectObj = touchObj;
    };
    // 开始建筑
    GuankaBase.prototype.buildStart = function (e) {
        alert('开始建筑了');
    };
    // 隐藏建造防御塔的选项工具ui
    GuankaBase.prototype.hideTool = function () {
        if (this.tool === null) {
            return;
        }
        this.tool.removeEventListener(ToolEvent.BuildStart, this.buildStart, this);
        this.tool.hide();
        this.tool = null;
    };
    return GuankaBase;
}(eui.Component));
__reflect(GuankaBase.prototype, "GuankaBase");
