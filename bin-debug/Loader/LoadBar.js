/**
 * 场景资源加载进度条
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
var LoadBar = (function (_super) {
    __extends(LoadBar, _super);
    function LoadBar() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/skins/loadbar.exml";
        return _this;
    }
    LoadBar.prototype.onProgress = function (current, total) {
        //this.textField.text = `Loading...${current}/${total}`;
        //this.loading.width = (current/total) * 428;
    };
    return LoadBar;
}(eui.Component));
__reflect(LoadBar.prototype, "LoadBar", ["RES.PromiseTaskReporter"]);
