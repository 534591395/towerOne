/**
 * 箭塔基类-箭塔的地基
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
var ArrowTowerFoundation = (function (_super) {
    __extends(ArrowTowerFoundation, _super);
    function ArrowTowerFoundation() {
        var _this = _super.call(this) || this;
        // 先左边攻击还是先右边攻击
        _this.firststrike = "R";
        return _this;
    }
    // 帧率执行回调方法
    ArrowTowerFoundation.prototype.onEnterFrame = function (timeStamp) {
    };
    return ArrowTowerFoundation;
}(TowerFoundation));
__reflect(ArrowTowerFoundation.prototype, "ArrowTowerFoundation");
