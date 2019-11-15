/**
 * 技能1- 火球
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
var Skill1 = (function (_super) {
    __extends(Skill1, _super);
    function Skill1() {
        var _this = _super.call(this) || this;
        _this.skillOffResName = 'uiskill1off';
        _this.skillOnResName = 'uiskill1';
        _this.cdtime = 25000;
        _this.default();
        return _this;
    }
    /**释放技能 */
    Skill1.prototype.releaseSkills = function (arr) {
        _super.prototype.releaseSkills.call(this, arr);
        this.xpos = arr[0];
        this.ypos = arr[1] + 20;
        this.timer = new egret.Timer(100, 10);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerHandle, this);
        this.timer.start();
    };
    Skill1.prototype.timerHandle = function (e) {
        var fireBall = ObjectPool.getInstance().createObject(FireBall);
        fireBall.damage = Math.sqrt(GuankaBase.instance.hardxs) * 20;
        if (this.timer.currentCount <= 4) {
            var xnum = 25 - Math.random() * 50 + this.xpos;
            var ynum = 25 - Math.random() * 50 + this.ypos;
        }
        else {
            var xnum = 50 + Math.random() * (this.stage.stageWidth - 100);
            var ynum = 50 + Math.random() * (this.stage.stageHeight - 100);
        }
        fireBall.init(xnum, ynum);
        fireBall.targets = GuankaBase.instance.enemyArr;
        GuankaBase.instance.weaponLayer.addChild(fireBall);
    };
    return Skill1;
}(SkillBase));
__reflect(Skill1.prototype, "Skill1");
