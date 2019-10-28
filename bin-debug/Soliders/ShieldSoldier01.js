/**
 * 盾塔- 士兵小队--士兵类
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
var ShieldSoldier01 = (function (_super) {
    __extends(ShieldSoldier01, _super);
    function ShieldSoldier01() {
        var _this = _super.call(this) || this;
        _this.view = new egret.MovieClip();
        _this.addChild(_this.view);
        _this.addTexture();
        return _this;
    }
    ShieldSoldier01.prototype.init = function (arr) {
        var _this = this;
        this.hp = this.life;
        this.atJihePoint = true;
        // 默认初始位置在防御塔的中心（椭圆中心），然后移动到指定的集合点
        this.position.x = this.x = arr[0][0];
        this.position.y = this.y = arr[0][1];
        arr.map(function (item) {
            var point = new Vector2D(item[0] + _this.xoffset, item[1] + _this.yoffset);
            _this.positionArr.push(point);
        });
        this.fsm.changeState(stateType.moveState);
    };
    /**创建*/
    ShieldSoldier01.prototype.onCreate = function () {
        //数据初始化
        this.positionArr = [];
        this.pathIndex = 0;
        //状态初始化
        this.timesum = 0;
        this.lifeBar.reset();
        this.canClear = false;
        this.target = null;
        this.moveToTarget = false;
        this.atJihePoint = false;
        this.fsm.changeState(stateType.idleState);
        this.currentState = stateType.idleState;
        // 士兵可以触摸
        this.view.touchEnabled = true;
        this.view.addEventListener(egret.TouchEvent.TOUCH_TAP, this.viewSelect, this);
    };
    /**添加纹理 初始化数据*/
    ShieldSoldier01.prototype.addTexture = function () {
        //获取贴图
        var data = RES.getRes("ShieldSoilder01json");
        var texture = RES.getRes("ShieldSoilder01png");
        var mcf = new egret.MovieClipDataFactory(data, texture);
        this.view.movieClipData = mcf.generateMovieClipData("ShieldSoilder01");
        this.view.x = this.view.width / 2;
        this.view.anchorOffsetX = this.view.width / 2;
        //血条位置
        this.lifeBar.x = 27;
        this.lifeBar.y = 10;
        this.maxSpeed = 0.6;
        this.fireDelay = 1000;
    };
    ShieldSoldier01.prototype.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
        this.view.touchEnabled = false;
        this.view.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.viewSelect, this);
    };
    ShieldSoldier01.prototype.onEnterFrame = function (advancedTime) {
        _super.prototype.onEnterFrame.call(this, advancedTime);
    };
    /** 设置士兵的集合点，并移动 */
    ShieldSoldier01.prototype.setJihePointToMove = function (arr) {
        this.atJihePoint = true;
        this.positionArr = [];
        this.jihePoint = new Vector2D(arr[0] + this.xoffset, arr[1] + this.yoffset);
        this.positionArr.push(this.jihePoint);
        // 改为移动状态
        this.fsm.changeState(stateType.moveState);
        if (this.target === null) {
            return;
        }
        // 清空怪物和士兵的攻击目标
        if (this.target.target !== null) {
            this.target.target = null;
        }
        this.target = null;
    };
    /**设置新的集结点触发自定义事件, 在关卡基类中点击背景图片调用 */
    ShieldSoldier01.prototype.setJihePointEvent = function (arr) {
        this.dispatchEvent(new SoldierEvent(SoldierEvent.Move, this, arr));
    };
    /** 选中士兵 */
    ShieldSoldier01.prototype.viewSelect = function (e) {
        Group.selectItem(this);
    };
    return ShieldSoldier01;
}(ShieldSoldierBase));
__reflect(ShieldSoldier01.prototype, "ShieldSoldier01");
