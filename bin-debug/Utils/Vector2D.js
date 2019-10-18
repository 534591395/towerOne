/**
 * 2D向量类--封装了常用操作方法
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Vector2D = (function () {
    function Vector2D(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this._x = x;
        this._y = y;
    }
    // 绘制线条表示向量，调试用
    Vector2D.prototype.draw = function (graphics, color) {
        if (color === void 0) { color = 0; }
        graphics.lineStyle(0, color);
        graphics.moveTo(0, 0);
        graphics.lineTo(this._x, this._y);
    };
    // 复制当前向量
    Vector2D.prototype.clone = function () {
        return new Vector2D(this.x, this.y);
    };
    Object.defineProperty(Vector2D.prototype, "x", {
        get: function () {
            return this._x;
        },
        set: function (value) {
            this._x = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2D.prototype, "y", {
        get: function () {
            return this._y;
        },
        set: function (value) {
            this._y = value;
        },
        enumerable: true,
        configurable: true
    });
    return Vector2D;
}());
__reflect(Vector2D.prototype, "Vector2D");
