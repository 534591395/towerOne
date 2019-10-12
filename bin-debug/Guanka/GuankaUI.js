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
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    GuankaUI.prototype.onAddToStage = function () {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.backToWorldBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleBackToWorld, this);
    };
    // 触发返回到世界地图界面
    GuankaUI.prototype.handleBackToWorld = function () {
        // 允许该事件冒泡
        this.dispatchEvent(new MainEvent(MainEvent.QuitGuanka, null, true));
    };
    return GuankaUI;
}(eui.Component));
__reflect(GuankaUI.prototype, "GuankaUI");
