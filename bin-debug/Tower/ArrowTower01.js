/**
 * 箭塔--等级：一级， 地基为 ArrowTowerFoundation
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
var ArrowTower01 = (function (_super) {
    __extends(ArrowTower01, _super);
    function ArrowTower01() {
        var _this = _super.call(this) || this;
        _this.addChild(Utiles.createBitmapByName("ArrowTower01"));
        // 加入弓箭手
        _this.shooter01 = new ArrowShooter01();
        _this.shooter01.x = 36;
        _this.shooter01.y = 15;
        _this.addChild(_this.shooter01);
        _this.shooter02 = new ArrowShooter01();
        _this.shooter02.x = 50;
        _this.shooter02.y = 15;
        _this.addChild(_this.shooter02);
        return _this;
    }
    // 帧率执行回调方法，实时刷新
    ArrowTower01.prototype.onEnterFrame = function (timeStamp) {
        _super.prototype.onEnterFrame.call(this, timeStamp);
        this.shooter01.onEnterFrame(timeStamp);
        this.shooter02.onEnterFrame(timeStamp);
        // 确定敌人方向
        this.direct = "downRight";
        // 播放射击音效
        // 两个射手轮流射击
        // 弓箭发射（产生点）的坐标点
        var p;
        if (this.firststrike === "L") {
            this.shooter01.file(this.direct);
            this.firststrike = "R";
            p = new egret.Point(this.sx - 5, this.sy - 46);
        }
        else if (this.firststrike === "R") {
            this.shooter02.file(this.direct);
            this.firststrike = "L";
            p = new egret.Point(this.sx + 5, this.sy - 46);
        }
        //利用对象池产生弓箭对象并进行碰撞检测
        // this.weapon = <Arrow01>ObjectPool.getInstance().createObject(Arrow01);
        // //this.weapon.damage = 4 * GuankaBase.instance.hardxs2;
        // this.weapon.damage = 4;
        // this.target = {
        //     x: 304,
        //     y: 361,
        //     offy: 10
        // };
        //this.weapon.init(p,this.target,this.target.offy);
        //this.parentContentLayer.addChild(this.weapon);
    };
    return ArrowTower01;
}(ArrowTowerFoundation));
__reflect(ArrowTower01.prototype, "ArrowTower01");
