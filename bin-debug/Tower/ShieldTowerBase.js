/**
 * 盾塔基类--士兵小队
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
var ShieldTowerBase = (function (_super) {
    __extends(ShieldTowerBase, _super);
    function ShieldTowerBase() {
        var _this = _super.call(this) || this;
        /** 士兵集合 */
        _this.soldiers = [];
        /**士兵集合点偏移量- 跟集合点坐标的偏移，防止士兵扎堆在一个点上，默认塔生成三个士兵 */
        _this.offsetArr = [[10, 0], [0, -10], [-10, 0]];
        /**集合点偏移量数组索引*/
        _this.offsetIndex = -1;
        /** 士兵少于规定的人数时，重新恢复一个士兵的时间 */
        _this.createTime = 10000;
        /** 时间累计， 跟 createTime 比较，timeSum >= createTime 可重新生成一个损失的士兵 */
        _this.timeSum = 0;
        // 最多生成的士兵数量
        _this.maxSolider = 3;
        /**音效资源*/
        _this.voiceArr = ["shield_ready1", "shield_ready2", "shield_ready3"];
        //播放音效
        var idx = Math.floor(Math.random() * 3);
        return _this;
        //SoundManager.playEffect(this.voiceArr[idx]);
    }
    ShieldTowerBase.prototype.init = function () {
        this.timer = new egret.Timer(1000, this.maxSolider);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.createOneSolider, this);
        this.timer.start();
    };
    /** 生成一个士兵 */
    ShieldTowerBase.prototype.createOneSolider = function (e) {
        var soldier = ObjectPool.getInstance().createObject(ShieldSoldier01);
        soldier.life = this.soldierLife;
        soldier.damage = this.soldierDamage;
        this.parentContentLayer.addChild(soldier);
        this.objArr.push(soldier);
        this.soldiers.push(soldier);
        // 更新索引
        this.updateOffsetIndex();
        soldier.xoffset = this.offsetArr[this.offsetIndex][0];
        soldier.yoffset = this.offsetArr[this.offsetIndex][1];
        soldier.init([[this.sx, this.sy], [this.soldierPoint.x, this.soldierPoint.y]]);
        // 添加自定义事件监听: SoldierEvent.Select, SoldierEvent.Deselect， 这两个事件触发请查看 GuankaBase的 bgTouch方法。SoldEvent.Move事件触发请查看 ShieldTower01的 setJihePointEvent方法，该方法也是在 bgTouch方法内调用
        soldier.addEventListener(SoldierEvent.Select, this.selectAll, this);
        soldier.addEventListener(SoldierEvent.Deselect, this.deselectAll, this);
        soldier.addEventListener(SoldierEvent.Move, this.moveAll, this);
    };
    /** 选择该塔的所有士兵 */
    ShieldTowerBase.prototype.selectAll = function () {
        this.soldiers.map(function (soldier) {
            // 取消触摸事件
            soldier.select();
        });
    };
    /** 取消选中该塔的所有士兵 */
    ShieldTowerBase.prototype.deselectAll = function () {
        this.soldiers.map(function (soldier) {
            // 启动触摸事件
            soldier.deselect();
        });
    };
    /** 移动该塔的所有士兵 */
    ShieldTowerBase.prototype.moveAll = function (e) {
        var _this = this;
        // 新的坐标集
        var arr = e.arr || [];
        // 超出移动范围，士兵有最大移动范围（即所在塔的攻击范围），不能移动
        var isin = Utiles.containsXY(arr[0], arr[1], this.sx, this.sy - 22, this.maxRadius, this.ratioY);
        if (!isin) {
            return;
        }
        //新的集结点
        this.soldierPoint = new egret.Point(arr[0], arr[1] + 8);
        // 移动士兵
        this.soldiers.map(function (soldier) {
            // 设置新的移动点
            soldier.setJihePointToMove([_this.soldierPoint.x, _this.soldierPoint.y]);
        });
    };
    // 更新索引
    ShieldTowerBase.prototype.updateOffsetIndex = function () {
        this.offsetIndex++;
        if (this.offsetIndex > (this.maxSolider - 1)) {
            this.offsetIndex = 0;
        }
    };
    ShieldTowerBase.prototype.onEnterFrame = function (timeStamp) {
        var _this = this;
        _super.prototype.onEnterFrame.call(this, timeStamp);
        // 设置进入攻击范围的敌人集合
        this.atargets = [];
        this.targets.map(function (target) {
            // 判断是否进入攻击范围
            var isIn = Utiles.containsXY(target.x, target.y, _this.sx, _this.sy - 22, _this.maxRadius, _this.ratioY);
            var index = _this.atargets.indexOf(target);
            // 进入攻击范围的敌人且敌人活着
            if (isIn && target.hp > 0) {
                if (index === -1) {
                    _this.atargets.push(target);
                }
            }
            else {
                // 移除已经离开攻击范围的敌人
                if (index > -1) {
                    _this.atargets.splice(index, 1);
                }
            }
        });
        // 士兵数量少于规定的最大数（死亡后重新生成）
        if (this.soldiers.length < this.maxSolider) {
            this.timeSum += timeStamp;
            if (this.timeSum >= this.createTime) {
                this.createOneSolider(null);
                this.timeSum = 0;
            }
        }
        var tumpArr = [];
        this.soldiers.map(function (soldier) {
            if (soldier.hp <= 0) {
                // 去掉监听
            }
            else {
                tumpArr.push(soldier);
                // 更新士兵的敌人集合，值为当前塔的进入攻击范围的敌人集合
                soldier.targets = _this.atargets;
            }
        });
        this.soldiers = tumpArr;
    };
    ShieldTowerBase.prototype.onDestroy = function () {
        if (this.timer !== null) {
            this.timer.removeEventListener(egret.TimerEvent.TIMER, this.createOneSolider, this);
            this.timer.stop();
            this.timer = null;
        }
        this.soldiers = [];
        this.atargets = [];
    };
    return ShieldTowerBase;
}(TowerFoundation));
__reflect(ShieldTowerBase.prototype, "ShieldTowerBase");
