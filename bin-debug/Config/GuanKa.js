/**
 * 关卡配置数据
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GuanKa = (function () {
    function GuanKa() {
    }
    // 获取关卡状态
    GuanKa.getData = function () {
        return GuanKa.data;
    };
    // 每个关卡的资源组名
    GuanKa.resourceNameArr = ["guanka01"];
    // 关卡状态
    GuanKa.data = [
        { "ispass": false, "wujin": false, name: "flag01", wujinMaxRound: 0 }
    ];
    return GuanKa;
}());
__reflect(GuanKa.prototype, "GuanKa");
