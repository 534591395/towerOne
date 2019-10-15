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
        return _super.call(this) || this;
    }
    return TowerFoundation;
}(Foundation));
__reflect(TowerFoundation.prototype, "TowerFoundation");
