/**
 * 地基 -01
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
var Foundation01 = (function (_super) {
    __extends(Foundation01, _super);
    function Foundation01() {
        var _this = _super.call(this) || this;
        _this.cacheAsBitmap = true;
        _this.addChild(Utiles.createBitmapByName('empty01'));
        return _this;
    }
    return Foundation01;
}(Foundation));
__reflect(Foundation01.prototype, "Foundation01");
