/**
 * 关卡UI，比如 技能面板、生命值面板、金币面板、操作面板等
 *
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
var GuankaUI = (function (_super) {
    __extends(GuankaUI, _super);
    function GuankaUI() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/skins/guankaUI.exml";
        _this.init();
        return _this;
    }
    GuankaUI.prototype.init = function () {
        this.backToWorldBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleBackToWorld, this);
        this.skill1 = new Skill1();
        this.skill2 = new Skill2();
        this.bottomLeftGroup.addChild(this.skill1);
        this.bottomLeftGroup.addChild(this.skill2);
        this.skill1.left = 0;
        this.skill2.right = 0;
    };
    // 触发返回到世界地图界面
    GuankaUI.prototype.handleBackToWorld = function () {
        // 允许该事件冒泡
        this.dispatchEvent(new MainEvent(MainEvent.QuitGuanka, null, true));
    };
    // 设置生命
    GuankaUI.prototype.setLife = function (num) {
        this.lifeLeftTxt.text = num.toString();
    };
    // 设置金币数量
    GuankaUI.prototype.setGold = function (num) {
        this.goldTxt.text = num.toString();
    };
    // 显示轮次
    GuankaUI.prototype.setRound = function (currentRound, totalRound) {
        this.roundTxt.text = currentRound.toString() + "/" + totalRound.toString();
    };
    // 实时刷新
    GuankaUI.prototype.onEnterFrame = function (timeStamp) {
        this.skill1.onEnterFrame(timeStamp);
        this.skill2.onEnterFrame(timeStamp);
    };
    return GuankaUI;
}(eui.Component));
__reflect(GuankaUI.prototype, "GuankaUI");
