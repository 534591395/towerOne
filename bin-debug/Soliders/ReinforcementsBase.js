/**
 * 玩家技能召唤出来的增援士兵 基类，继承士兵类
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
var ReinforcementsBase = (function (_super) {
    __extends(ReinforcementsBase, _super);
    function ReinforcementsBase() {
        var _this = _super.call(this) || this;
        // 该增援士兵存在时间
        _this.totalLifeTime = 30000;
        _this.lifetimesum = 0;
        return _this;
    }
    /**arr.length =2 ,第一个表示士兵产生点，第二个表示士兵集合点  */
    ReinforcementsBase.prototype.init = function (arr) {
        var _this = this;
        this.atJihePoint = true;
        // 默认初始位置在防御塔的中心（椭圆中心），然后移动到指定的集合点
        this.position.x = this.x = arr[0][0];
        this.position.y = this.y = arr[0][1];
        arr.map(function (item) {
            var point = new Vector2D(item[0] + _this.xoffset, item[1] + _this.yoffset);
            _this.positionArr.push(point);
        });
        this.jihePoint = this.positionArr[this.positionArr.length - 1];
        this.fsm.changeState(stateType.moveState);
    };
    /**创建*/
    ReinforcementsBase.prototype.onCreate = function () {
        //数据初始化
        this.hp = 400;
        this.positionArr = [];
        this.pathIndex = 0;
        //状态初始化
        this.timesum = 0;
        this.lifeBar.reset();
        this.canClear = false;
        this.target = null;
        this.moveToTarget = false;
        this.atJihePoint = false;
        this.lifetimesum = 0;
        this.totalLifeTime = 30000;
        this.fsm.changeState(stateType.idleState);
        this.currentState = stateType.idleState;
    };
    ReinforcementsBase.prototype.onDestroy = function () {
        // 该对象从场景里移除
        _super.prototype.onDestroy.call(this);
    };
    ReinforcementsBase.prototype.onEnterFrame = function (timeStamp) {
        _super.prototype.onEnterFrame.call(this, timeStamp);
        this.lifetimesum += timeStamp;
        if (this.lifetimesum >= this.totalLifeTime) {
            this.hp = 0;
            this.lifeBar.reset();
            this.lifeBar.visible = false;
            this.setMoveAngleLabel(90);
            this.lifetimesum = 0;
        }
    };
    /** 设置士兵的集合点，并移动 */
    ReinforcementsBase.prototype.setJihePointToMove = function (arr) {
        this.atJihePoint = true;
        this.pathIndex = 0;
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
    return ReinforcementsBase;
}(ShieldSoldierBase));
__reflect(ReinforcementsBase.prototype, "ReinforcementsBase");
