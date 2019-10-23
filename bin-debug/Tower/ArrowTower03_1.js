/**
 * 箭塔--等级：二级， 地基为 ArrowTowerFoundation
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
var ArrowTower03_1 = (function (_super) {
    __extends(ArrowTower03_1, _super);
    function ArrowTower03_1() {
        var _this = _super.call(this) || this;
        // 攻击力
        _this.damage = 12;
        _this.minRadius = 100;
        _this.maxRadius = 140;
        _this.ratioY = _this.minRadius / _this.maxRadius;
        _this.addChild(Utiles.createBitmapByName("ArrowTower03_1"));
        // 加入弓箭手
        _this.shooter01 = new ArrowShooter01();
        _this.shooter01.x = 36;
        _this.shooter01.y = 5;
        _this.addChild(_this.shooter01);
        _this.shooter02 = new ArrowShooter01();
        _this.shooter02.x = 50;
        _this.shooter02.y = 5;
        _this.addChild(_this.shooter02);
        // 延迟攻击时间
        _this.fireDelay = 1000;
        return _this;
    }
    // 帧率执行回调方法，实时刷新
    ArrowTower03_1.prototype.onEnterFrame = function (timeStamp) {
        _super.prototype.onEnterFrame.call(this, timeStamp);
        this.shooter01.onEnterFrame(timeStamp);
        this.shooter02.onEnterFrame(timeStamp);
        // 若没有敌人进入攻击范围，停止攻击
        if (this.atargets.length === 0) {
            this.timesum = this.fireDelay;
            return;
        }
        // 时间累积，设置攻击间隔
        this.timesum += timeStamp;
        // 攻击间隔时间未到
        if (this.timesum < this.fireDelay) {
            return;
        }
        this.timesum = 0;
        // 获取第一个敌人
        this.target = this.atargets[0];
        // 确定敌人方向
        if (this.target.x >= this.sx && this.target.y <= this.sy - 22) {
            this.direct = "upRight";
        }
        if (this.target.x >= this.sx && this.target.y > this.sy - 22) {
            this.direct = "downRight";
        }
        if (this.target.x < this.sx && this.target.y <= this.sy - 22) {
            this.direct = "upLeft";
        }
        if (this.target.x < this.sx && this.target.y > this.sy - 22) {
            this.direct = "downLeft";
        }
        // 播放射击音效
        //this.playFireVoice();
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
        this.weapon = ObjectPool.getInstance().createObject(Arrow01);
        this.weapon.damage = this.damage;
        this.weapon.init(p, this.target, this.target.offy);
        this.parentContentLayer.addChild(this.weapon);
    };
    return ArrowTower03_1;
}(ArrowTowerFoundation));
__reflect(ArrowTower03_1.prototype, "ArrowTower03_1");
