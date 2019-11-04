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
    MagicTowerBase.prototype.onEnterFrame = function () {
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
    return MagicTowerBase;
}(TowerFoundation));
__reflect(MagicTowerBase.prototype, "MagicTowerBase");
