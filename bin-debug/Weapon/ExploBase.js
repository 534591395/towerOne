/**
 * 武器炮弹基类
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
var ExploBase = (function (_super) {
    __extends(ExploBase, _super);
    function ExploBase() {
        var _this = _super.call(this) || this;
        // 是否击中目标
        _this.isHit = false;
        // 是否跟踪目标
        _this.follow = false;
        /**攻击范围最大半径*/
        _this.maxSoldRadius = 40;
        /**攻击范围最小半径*/
        _this.minSoldRadius = 40;
        // 射出的箭运行的时间（做抛物线运动）
        _this.t0 = 0;
        _this.t1 = 25;
        _this.g = 1; //重力
        _this.ratioSoldY = _this.minSoldRadius / _this.maxSoldRadius;
        return _this;
    }
    ExploBase.prototype.init = function (p, tar, offy) {
        //设置目标状态
        this.x = p.x;
        this.y = p.y;
        this.p = p;
        this.target = tar;
        this.offy = offy;
        this.setTarget(this.target.x, this.target.y - this.offy);
        this.follow = true;
    };
    ExploBase.prototype.onCreate = function () {
        this.canClear = false;
        this.isHit = false;
        this.follow = false;
        this.target = null;
        this.view.gotoAndStop(1);
        this.t0 = 0;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.pos = null;
    };
    // 公式说明：y轴自由落体h的高度计算公式-- h = (gt^2)/2 ; 距离公式-- s = vt; 求实际运行距离（非位移）；
    // 参考：：http://note.youdao.com/noteshare?id=5ea278d1f8e3de02e6cf5637e3052818&sub=9514F035D01E4CA3A136C860A112BB55
    /**计算双轴速度*/
    ExploBase.prototype.setTarget = function (x, y) {
        this.pos = new egret.Point(x, y);
        //根据终点计算双轴速度
        this.xSpeed = (this.pos.x - this.p.x) / this.t1;
        this.ySpeed = (((this.pos.y - this.p.y) - ((this.g * this.t1) * (this.t1 / 2))) / this.t1);
    };
    /**移动*/
    ExploBase.prototype.move = function () {
        this.setTarget(this.target.x, this.target.y - this.offy);
        this.t0 += 0.5;
        this.x = (this.p.x + (this.t0 * this.xSpeed));
        this.y = ((this.p.y + (this.t0 * this.ySpeed)) + (((this.g * this.t0) * this.t0) / 2));
        this.t0 += 0.5;
        var Sx = (this.p.x + (this.t0 * this.xSpeed));
        var Sy = ((this.p.y + (this.t0 * this.ySpeed)) + (((this.g * this.t0) * this.t0) / 2));
        this.t0 -= 0.5;
        var dx = Sx - this.x;
        var dy = Sy - this.y;
        //根据弓箭的角度来允许碰撞
        this.angle = Math.atan2(dy, dx) * 180 / Math.PI + 180;
    };
    ExploBase.prototype.onEnterFrame = function (timeStamp) {
        //刷新
        this.update();
        //击中
        if (this.isHit) {
            this.view.gotoAndPlay("hit");
            this.isHit = false;
        }
        //播放完成
        if (this.view.currentLabel == "hitEnd" || this.view.currentLabel == "missEnd") {
            this.canClear = true;
        }
        //销毁
        if (this.canClear) {
            ObjectPool.getInstance().destroyObject(this);
        }
    };
    ExploBase.prototype.update = function () {
        if (this.follow) {
            this.move();
            this.hittest();
        }
    };
    /**碰撞检测，参考第三方*/
    // target值设置说明：在塔执行fire时，target = this.atargets[0]； 每次检测时，保证target是活着的。 
    ExploBase.prototype.hittest = function () {
        var _this = this;
        //允许攻击角度
        if (this.angle >= 0 && this.angle <= 180)
            return;
        //
        var disx = this.x - this.target.x < 0 ? this.target.x - this.x : this.x - this.target.x;
        var disy = this.y - this.target.y - this.offy < 0 ? this.target.y - this.offy - this.y : this.y - this.target.y - this.offy;
        //精确到1个像素内
        if (disx <= 1 && disy <= 1) {
            // 进入攻击范围的敌人
            this.atargets = [];
            this.targets.map(function (item) {
                var isIn = Utiles.containsXY(item.x, item.y, _this.x, _this.x, _this.maxSoldRadius, _this.ratioSoldY);
                var index = _this.atargets.indexOf(item);
                if (isIn && item.hp > 0) {
                    if (index === -1) {
                        _this.atargets.push(item);
                    }
                }
                else {
                    // 已经不在该塔的攻击范围内
                    if (index > -1) {
                        _this.atargets.splice(index, 1);
                    }
                }
            });
            this.atargets.map(function (item) {
                item.hp -= _this.damage;
            });
            this.isHit = true;
            this.follow = false;
            //
            //SoundManager.playEffect("explo_fireend1");
        }
    };
    return ExploBase;
}(Elements));
__reflect(ExploBase.prototype, "ExploBase");
