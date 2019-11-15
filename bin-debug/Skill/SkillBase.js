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
        // 累计时间
        _this.sumtime = 0;
        // 技能cd 时间
        _this.cdtime = 0;
        // 技能cd中
        _this.iscd = true;
        _this.skinName = "resource/skins/skill.exml";
        return _this;
    }
    SkillBase.prototype.default = function () {
        this.skill.source = RES.getRes(this.skillOffResName);
        this.touchEnabled = true;
    };
    SkillBase.prototype.onCreate = function () {
        this.iscd = true;
        this.sumtime = 0;
    };
    SkillBase.prototype.onDestroy = function () { };
    SkillBase.prototype.onEnterFrame = function (timeStamp) {
        if (this.iscd) {
            this.sumtime += timeStamp;
            // per 剩余cd
            var per = 1 - (this.sumtime / this.cdtime);
            this.setMbHeight(this.skill.height * per);
            if (per <= 0) {
                this.iscd = false;
                this.skill.source = RES.getRes(this.skillOnResName);
                this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandle, this);
            }
        }
    };
    /**设置蒙层图片高度，模拟cd进度状态 */
    SkillBase.prototype.setMbHeight = function (num) {
        this.mb.height = num;
    };
    /**释放技能，状态还原 */
    SkillBase.prototype.releaseSkills = function (arr) {
        this.skill.source = RES.getRes(this.skillOffResName);
        this.setMbHeight(this.skill.height);
        this.sumtime = 0;
        this.iscd = true;
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandle, this);
    };
    /**点击了技能 */
    SkillBase.prototype.touchHandle = function (e) {
        Group.selectItem(this);
    };
    SkillBase.prototype.reselectItem = function () { };
    /**选择了技能后，遍历关卡的显示对象，此时士兵不可触摸（原先点击士兵后是可移动的，所以要禁止） */
    SkillBase.prototype.selectItem = function () {
        this.uiskilliframe.source = RES.getRes('uiskillon');
        GuankaBase.instance.objArr.map(function (obj) {
            // 如果是士兵
            if (egret.getQualifiedSuperclassName(obj) === "ShieldSoldierBase") {
                obj.view.touchEnabled = false;
            }
        });
    };
    /** 选择了技能A后，再次选择某个对象后，会触发这个方法， A.deselectItem()，技能选择状态取消 */
    SkillBase.prototype.deselectItem = function () {
        this.uiskilliframe.source = RES.getRes('uiskilloff');
        GuankaBase.instance.objArr.map(function (obj) {
            // 如果是士兵
            if (egret.getQualifiedSuperclassName(obj) === "ShieldSoldierBase") {
                obj.view.touchEnabled = true;
            }
        });
    };
    return SkillBase;
}(eui.Component));
__reflect(SkillBase.prototype, "SkillBase");
