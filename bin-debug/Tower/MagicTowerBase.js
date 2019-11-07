/**
 * 魔法塔-基类
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
var MagicTowerBase = (function (_super) {
    __extends(MagicTowerBase, _super);
    function MagicTowerBase() {
        var _this = _super.call(this) || this;
        /**开火延迟 */
        _this.fireDelay = 1000;
        /**时间累计，跟fireDelay比较，若timesum>=fireDelay， 可以开火 */
        _this.timesum = 0;
        /**是否开火 */
        _this.isfire = false;
        /**音效资源*/
        _this.voiceArr = ["magic_ready1", "magic_ready2", "magic_ready3"];
        return _this;
    }
    MagicTowerBase.prototype.playFireVoice = function () {
    };
    MagicTowerBase.prototype.onEnterFrame = function (timeStamp) {
        var _this = this;
        // 进入攻击范围的敌人，没有攻击对象的敌人
        this.atargets = [];
        this.targets.map(function (item) {
            if (item.target === null) {
                var isIn = Utiles.containsXY(item.x, item.y, _this.sx, _this.sy - 22, _this.maxRadius, _this.ratioY);
                var index = _this.atargets.indexOf(item);
                if (isIn && item.hp > 0) {
                    if (index === -1) {
                        _this.atargets.push(item);
                    }
                }
                else {
                    // 已经不在该塔的攻击范围内
                    if (index > -1) {
                        _this.atargets.splice(index, 1);
                    }
                }
            }
        });
        //排序、敌人的攻击对象不为null时则排到末尾
        this.targets.map(function (item) {
            if (item.target !== null) {
                var isIn = Utiles.containsXY(item.x, item.y, _this.sx, _this.sy - 22, _this.maxRadius, _this.ratioY);
                var index = _this.atargets.indexOf(item);
                if (isIn && item.hp > 0) {
                    if (index === -1) {
                        _this.atargets.push(item);
                    }
                }
                else {
                    // 已经不在该塔的攻击范围内
                    if (index > -1) {
                        _this.atargets.splice(index, 1);
                    }
                }
            }
        });
    };
    // 射击，法师生成的魔法球需要点时间，所以发射前需要处理
    MagicTowerBase.prototype.fire = function (timeStamp) {
        this.shooter.onEnterFrame(timeStamp);
        // 若没有敌人进入攻击范围，停止攻击
        if (this.atargets.length === 0) {
            // 减去的 299 阈值，是发射前魔法师生成魔法球的时间
            this.timesum = this.fireDelay - 299;
            return;
        }
        // 获取第一个敌人
        this.target = this.atargets[0];
        // 确定敌人方向，即魔法弹的进攻方向
        if (this.target.y <= this.sy - 22) {
            this.direct = "up";
        }
        if (this.target.y > this.sy - 22) {
            this.direct = "down";
        }
        // 时间累积，设置攻击间隔
        this.timesum += timeStamp;
        // 攻击间隔时间未到
        if (this.timesum < this.fireDelay) {
            // 生成魔法球判断
            if ((this.fireDelay - this.timesum) < 300 && !this.isfire) {
                this.shooter.fire(this.direct);
                this.isfire = true;
            }
            return;
        }
        this.timesum = 0;
        this.isfire = false;
        // 播放射击音效
        //this.playFireVoice();
        // 魔法球生成的坐标
        var p;
        if (this.direct == "down") {
            p = new egret.Point(this.sx - 9, this.sy - 58);
        }
        else {
            p = new egret.Point(this.sx + 5, this.sy - 58);
        }
        //利用对象池产生弓箭对象并进行碰撞检测
        this.weapon = ObjectPool.getInstance().createObject(MagicBullet010203);
        this.weapon.damage = this.damage;
        this.weapon.init(p, this.target, this.target.offy);
        this.parentContentLayer.addChild(this.weapon);
    };
    return MagicTowerBase;
}(TowerFoundation));
__reflect(MagicTowerBase.prototype, "MagicTowerBase");
