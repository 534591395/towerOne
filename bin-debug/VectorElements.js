/**
 * 所有可移动行为的对象基类（向量）
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
var VectorElements = (function (_super) {
    __extends(VectorElements, _super);
    function VectorElements() {
        var _this = _super.call(this) || this;
        // 路径集合
        _this.positionArr = [];
        return _this;
    }
    // 实时刷新
    VectorElements.prototype.onEnterFrame = function (advancedTime) {
        // 若对象不在移动状态，无需改变向量
        if (this.currentState !== stateType.moveState) {
            return;
        }
    };
    return VectorElements;
}(Elements));
__reflect(VectorElements.prototype, "VectorElements");
