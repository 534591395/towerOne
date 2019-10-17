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
        // 怪物行走路径点
        _this.roadArr1 = [];
        _this.roadArr2 = [];
        console.log("游戏关卡一");
        // 设置地基坐标集合，当前手动设置
        _this.foundationPosiotionArr = [[484, 266], [436, 316], [354, 316], [314, 266], [354, 206], [436, 206], [634, 316], [394, 436], [228, 141]];
        _this.roadArr1 = [[812, 241], [584, 241], [484, 141], [304, 141], [214, 241], [24, 241]];
        _this.roadArr2 = [[812, 263], [584, 263], [484, 363], [304, 363], [214, 263], [24, 263]];
        _this.roadArr.push(_this.roadArr1);
        _this.roadArr.push(_this.roadArr2);
        _this.enemyData = [
            { "type": "Monster01", "count": 10, "life": 10, "maxSpeed": 0.4, "damage": 2, "value": 10 },
            { "type": "Monster02", "count": 10, "life": 10, "maxSpeed": 0.8, "damage": 2, "value": 10 },
            { "type": "Monster03", "count": 15, "life": 15, "maxSpeed": 0.4, "damage": 4, "value": 15 },
            { "type": "Monster04", "count": 15, "life": 20, "maxSpeed": 0.7, "damage": 4, "value": 15 },
            { "type": "Monster05", "count": 20, "life": 25, "maxSpeed": 0.4, "damage": 8, "value": 20 },
            { "type": "Monster06", "count": 20, "life": 30, "maxSpeed": 0.4, "damage": 8, "value": 20 },
            { "type": "Boss01", "count": 2, "life": 300, "maxSpeed": 0.4, "damage": 16, "value": 500 }
        ];
        _this.createUI();
        _this.backgroundImage.source = Utiles.createBitmapByName("map0").texture;
        _this.createFoundation(Foundation01);
        _this.default();
        //门
        var bm = Utiles.createBitmapByName("men");
        bm.x = -33;
        bm.y = 106;
        _this.weaponLayer.addChild(bm);
        return _this;
    }
    // 初始化数据
    Guanka01.prototype.default = function () {
        this.wujinRoundSum = 0;
        this.currentRound = -1;
        this.roundMosterLeft = -1;
        this.delayToNextSum = 0;
        this.otime = 0;
        this.rounding = false;
        this.hardxs = 1;
        this.gold = 250;
        this.life = 20;
        this.allRound = this.enemyData.length;
        this.guankaUI.setGold(this.gold);
        this.guankaUI.setLife(this.life);
        // 区分故事（剧情）模式还是无尽模式（说明：故事模式通关后开启无尽模式）
        if (Main.wujin) {
            this.guankaUI.setRound(0, 0);
        }
        else {
            this.guankaUI.setRound(0, this.allRound);
        }
        //播放背景音乐
        SoundManager.playBgSound("map0bgSound");
        // 添加心跳监测, startTick函数的参数，第一个参数即它的回调函数，要求有返回值，如果返回为true将在回调函数执行完成之后立即重绘，为false则不会重绘
        egret.startTick(this.onEnterFrame, this);
    };
    Guanka01.prototype.onEnterFrame = function (timeStamp) {
        _super.prototype.onEnterFrame.call(this, timeStamp);
        return false;
    };
    Guanka01.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        RES.destroyRes(GuanKa.resourceNameArr[Main.choseNumber]);
    };
    return Guanka01;
}(GuankaBase));
__reflect(Guanka01.prototype, "Guanka01");
