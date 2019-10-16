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
        // 塔实例集合
        _this.towerArr = [];
        // 建筑队列--由于建筑异步执行（等待建筑动画执行完毕），故需要一个建筑队列
        _this.buildQuene = [];
        // 关于这边层的使用说明：通过层来控制显示顺序，以及显示分类
        // UI特效层、提示层
        _this.uiLayer = new egret.DisplayObjectContainer();
        _this.addChild(_this.uiLayer);
        // 地基层
        _this.foundationLayer = new egret.DisplayObjectContainer();
        _this.addChild(_this.foundationLayer);
        // 怪物层、士兵层、英雄层、塔层(层级排序)
        _this.objLayer = new egret.DisplayObjectContainer();
        _this.addChild(_this.objLayer);
        // 添加武器层
        _this.weaponLayer = new egret.DisplayObjectContainer();
        _this.addChild(_this.weaponLayer);
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
    // 实时刷新，子类中执行
    GuankaBase.prototype.onEnterFrame = function (timeStamp) {
        this.enterFrameTowers(timeStamp);
    };
    GuankaBase.prototype.enterFrameTowers = function (timeStamp) {
        this.towerArr.map(function (tower) {
            tower.onEnterFrame(timeStamp);
        });
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
    // 地基\塔被点击
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
    // 开始建筑---说明：升级塔无需等待
    GuankaBase.prototype.buildStart = function (e) {
        // 防御塔类别名称
        var towerName = e.className;
        // 新建防御塔
        if (towerName === 'ArrowTower01') {
            // 播放修建动画
            var buildWait = new BuildWait(towerName, this.selectObj.index);
            buildWait.x = this.selectObj.x;
            buildWait.y = this.selectObj.y - 25;
            this.objLayer.addChild(buildWait);
            buildWait.addEventListener(ToolEvent.BuildComplete, this.buildComplete, this);
            // 扣除建筑费用
            this.gold -= e.price;
            this.guankaUI.setGold(this.gold);
            // 由于建筑异步执行，故需要放入建筑队列
            this.buildQuene.push({
                className: towerName,
                x: this.selectObj.x,
                y: this.selectObj.y,
                towerWidth: this.selectObj.width,
                towerHeight: this.selectObj.height,
                index: this.selectObj.index
            });
        }
        // 移除建筑工具ui
        Group.dispose();
        this.hideTool();
        // 移除上一个选中的塔|地基 -- 查看：this.createFoundation | this.buildTower
        this.selectObj.addEventListener(egret.TouchEvent.TOUCH_TAP, this.foundationOrTowerTouch, this);
        // 排除地基--地基不从舞台上删除（地基重复使用，故无需删除）
        if (egret.getQualifiedSuperclassName(this.selectObj) !== "Foundation") {
            // 删除塔
            this.objLayer.removeChild(this.selectObj);
            var index = this.towerArr.indexOf(this.selectObj);
            if (index > -1) {
                this.towerArr.splice(index, 1);
            }
            this.selectObj.destroy();
        }
        this.selectObj = null;
    };
    // 建筑完成
    GuankaBase.prototype.buildComplete = function (e) {
        // 从舞台上删除建筑动画
        var waitBuild = e.currentTarget;
        var index = waitBuild.index;
        waitBuild.removeEventListener(ToolEvent.BuildComplete, this.buildComplete, this);
        this.objLayer.removeChild(waitBuild);
        // 移除建筑队列
        var arr = [];
        var tower;
        this.buildQuene.map(function (build) {
            if (build.index === index) {
                tower = build;
            }
            else {
                arr.push(build);
            }
        });
        this.buildQuene = arr;
        if (tower) {
            this.buildTower(tower, tower.className);
        }
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
    // 创建防御塔
    GuankaBase.prototype.buildTower = function (towerObj, towerName) {
        // 获取防御塔类
        var towerClassName = egret.getDefinitionByName(towerName);
        var tower = new towerClassName();
        tower.x = tower.sx = towerObj.x;
        tower.y = tower.sy = towerObj.y - towerObj.towerHeight + 15;
        tower.index = towerObj.index;
        // 防御塔所属基地类
        var foundationClassName = egret.getQualifiedSuperclassName(tower);
        if (foundationClassName === 'ArrowTowerFoundation') {
            // 放置子类的容器为游戏场景的武器层
            tower.parentContentLayer = this.weaponLayer;
        }
        this.objLayer.addChild(tower);
        this.towerArr.push(tower);
        tower.touchEnabled = true;
        tower.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.foundationOrTowerTouch, this);
        tower.addEventListener(TowerEvent.ShowTool, this.showTool, this);
        tower.addEventListener(TowerEvent.HideTool, this.hideTool, this);
    };
    GuankaBase.prototype.destroy = function () {
    };
    return GuankaBase;
}(eui.Component));
__reflect(GuankaBase.prototype, "GuankaBase");
