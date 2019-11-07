/**
 * 碰撞检测帮助类--第三方参考
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var HitTest = (function () {
    function HitTest() {
    }
    /**基于矩形的碰撞检测*/
    HitTest.hitTestRect = function (obj1, obj2) {
        var rect1 = obj1.getBounds();
        var rect2 = obj2.getBounds();
        rect1.x = obj1.x;
        rect1.y = obj1.y;
        rect2.x = obj2.x;
        rect2.y = obj2.y;
        return rect1.intersects(rect2) || rect2.intersects(rect1);
    };
    /**不同层级坐标碰撞检测法*/
    HitTest.hitTestLayer = function (obj1, obj2) {
        //算法 | (x1 + w1 / 2) – (x2 + w2/2) | < |(w1 + w2) / 2|
        return Math.abs((obj1.x + obj1.width / 2) - (obj2.x + obj2.width / 2)) <= Math.abs((obj1.width + obj2.width) / 2) && Math.abs((obj1.y + obj1.height / 2) - (obj2.y + obj2.height / 2)) <= Math.abs((obj1.height + obj2.height) / 2);
    };
    return HitTest;
}());
__reflect(HitTest.prototype, "HitTest");
