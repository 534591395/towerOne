/**
 * 防御塔基类， 继承地基基类（建筑依赖地基）
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
var TowerFoundation = (function (_super) {
    __extends(TowerFoundation, _super);
    function TowerFoundation() {
        var _this = _super.call(this) || this;
        /**敌人集合 */
        _this.targets = [];
        /**进入射程的敌人集合(涉及排序 优先攻击距离终点最近者)*/
        _this.atargets = [];
        /**射程范围最大半径*/
        _this.maxRadius = 140;
        /**射程范围最小半径*/
        _this.minRadius = 100;
        return _this;
    }
    // 销毁
    TowerFoundation.prototype.destroy = function () {
    };
    TowerFoundation.prototype.onEnterFrame = function (timeStamp) { };
    // 初始化
    TowerFoundation.prototype.init = function () {
    };
    return TowerFoundation;
}(Foundation));
__reflect(TowerFoundation.prototype, "TowerFoundation");
