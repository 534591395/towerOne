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
        /**音效资源*/
        _this.voiceArr = ["shield_ready1", "shield_ready2", "shield_ready3"];
        //播放音效
        var idx = Math.floor(Math.random() * 3);
        return _this;
        //SoundManager.playEffect(this.voiceArr[idx]);
    }
    return ShieldTowerBase;
}(TowerFoundation));
__reflect(ShieldTowerBase.prototype, "ShieldTowerBase");
