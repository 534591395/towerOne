/**
 * 玩家技能基类
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
var SkillBase = (function (_super) {
    __extends(SkillBase, _super);
    function SkillBase() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/skins/skill.exml";
        _this.skill.source = RES.getRes(_this.skillResName);
        _this.touchEnabled = true;
        return _this;
    }
    return SkillBase;
}(eui.Component));
__reflect(SkillBase.prototype, "SkillBase");
