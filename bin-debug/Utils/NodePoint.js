var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * 节点类
 * 参考第三方代码
 *
 */
var NodePoint = (function () {
    function NodePoint(x, y) {
        this.walkable = true;
        this.x = x;
        this.y = y;
    }
    return NodePoint;
}());
__reflect(NodePoint.prototype, "NodePoint");
