/**
 * 游戏关卡一
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
var Guanka01 = (function (_super) {
    __extends(Guanka01, _super);
    function Guanka01() {
        var _this = _super.call(this) || this;
        console.log("游戏关卡一");
        _this.backgroundImage.texture = Utiles.createBitmapByName("map0").texture;
        // 设置地基坐标集合，当前手动设置
        _this.foundationPosiotionArr = [[484, 266], [436, 316], [354, 316], [314, 266], [354, 206], [436, 206], [634, 316], [394, 436], [228, 141]];
        _this.createUI();
        _this.createFoundation(Foundation01);
        return _this;
    }
    return Guanka01;
}(GuankaBase));
__reflect(Guanka01.prototype, "Guanka01");
