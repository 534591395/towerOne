/**
 * 工具类
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Utiles = (function () {
    function Utiles() {
    }
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    Utiles.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    /**
    * 检测是否进入椭圆范围
    * @param px             被检测点x坐标
    * @param py             被检测点y坐标
    * @param cx             椭圆圆心x坐标
    * @param cy             椭圆圆心y坐标
    * @param r              椭圆最大半径
    * @param sy             将圆沿y轴压扁变为椭圆时候的比例
    * @return               是否包含在椭圆中
    */
    Utiles.containsXY = function (px, py, cx, cy, r, sy) {
        if (sy === void 0) { sy = 0.5; }
        var dx = px - cx;
        var dy = py - cy;
        dy /= sy;
        if (Math.sqrt(dx * dx + dy * dy) < r) {
            return true;
        }
        return false;
    };
    /*
    * 对象冒泡排序
    */
    Utiles.sortarr = function (arr) {
        var tmp;
        for (var i = 0; i < arr.length; i++) {
            for (var j = arr.length - 1; j > i; j--) {
                if (arr[j].y < arr[j - 1].y) {
                    tmp = arr[j];
                    arr[j] = arr[j - 1];
                    arr[j - 1] = tmp;
                }
            }
        }
        return arr;
    };
    return Utiles;
}());
__reflect(Utiles.prototype, "Utiles");
