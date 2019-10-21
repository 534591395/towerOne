/**
 * 怪物类
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
var Monster = (function (_super) {
    __extends(Monster, _super);
    function Monster() {
        var _this = _super.call(this) || this;
        _this.view = new egret.MovieClip();
        _this.addChild(_this.view);
        return _this;
    }
    /**创建*/
    Monster.prototype.onCreate = function () {
        //数据初始化
        this.positionArr = [];
        this.pathIndex = 0;
        //状态初始化
        this.timesum = 0;
        this.lifeBar.reset();
        this.canClear = false;
        this.beKill = false;
        this.beAttack = false;
        this.target = null;
        this.fsm.changeState(stateType.idleState);
        this.currentState = stateType.idleState;
    };
    /**添加纹理 初始化数据*/
    Monster.prototype.addTexture = function (tietu) {
        //获取贴图
        var data = RES.getRes(tietu + "json");
        var texture = RES.getRes(tietu + "png");
        var mcf = new egret.MovieClipDataFactory(data, texture);
        this.view.movieClipData = mcf.generateMovieClipData(tietu);
        //this.view.anchorX = 0.5;
        this.view.x = this.view.width / 2;
        //描点位置
        // this.anchorX = 0.5;
        // this.anchorY = 0.9;
        //血条位置
        this.lifeBar.x = (this.view.width - this.lifeBar.width) / 2;
        this.lifeBar.y = -5;
        //初始不会变化的数值数据
        this.offy = 10;
        this.fireDelay = 1000;
    };
    /**初始化 运动路径点*/
    Monster.prototype.init = function (arr, life, speed, damage, value) {
        if (!arr.length) {
            return;
        }
        //属性
        this.hp = this.life = life;
        this.maxSpeed = speed;
        this.damage = damage;
        this.value = value;
        //路径
        this.position.x = this.x = arr[0][0];
        this.position.y = this.y = arr[0][1];
        var i = 1;
        var len = arr.length;
        var v2d;
        //X坐标随机错开
        var offy = Math.round(10 - Math.random() * 20); //Y坐标随机错开
        for (i; i < arr.length; i++) {
            v2d = new Vector2D(arr[i][0], arr[i][1] + offy);
            this.positionArr.push(v2d);
        }
        this.fsm.changeState(stateType.moveState);
    };
    /**帧事件*/
    Monster.prototype.onEnterFrame = function (advancedTime) {
        _super.prototype.onEnterFrame.call(this, advancedTime);
    };
    return Monster;
}(MonsterBase));
__reflect(Monster.prototype, "Monster");
