/**
 * 技能2 --增援士兵
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
var Skill2 = (function (_super) {
    __extends(Skill2, _super);
    function Skill2() {
        var _this = _super.call(this) || this;
        _this.skillResName = 'uiskill2';
        return _this;
    }
    return Skill2;
}(SkillBase));
__reflect(Skill2.prototype, "Skill2");
