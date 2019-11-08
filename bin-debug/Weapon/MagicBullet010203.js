/**
 * 魔法弹
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
var MagicBullet010203 = (function (_super) {
    __extends(MagicBullet010203, _super);
    function MagicBullet010203() {
        var _this = _super.call(this) || this;
        _this.view = new egret.MovieClip();
        _this.addChild(_this.view);
        var data = RES.getRes("MagicBullet010203json");
        var texture = RES.getRes("MagicBullet010203png");
        var mcf = new egret.MovieClipDataFactory(data, texture);
        _this.view.movieClipData = mcf.generateMovieClipData("MagicBullet010203");
        return _this;
    }
    MagicBullet010203.prototype.onCreate = function () {
        this.canClear = false;
        this.isMiss = false;
        this.isHit = false;
        this.follow = false;
        this.isTravel = true;
        this.target = null;
        this.maxSpeed = 2;
        this.fsm.changeState(stateType.idleState);
    };
    MagicBullet010203.prototype.init = function (p, target) {
        this.target = target;
        this.position.x = this.x = p.x;
        this.position.y = this.y = p.y;
        this.setPositionArr();
    };
    MagicBullet010203.prototype.onEnterFrame = function (timeStamp) {
        _super.prototype.onEnterFrame.call(this, timeStamp);
    };
    return MagicBullet010203;
}(MagicBulletBase));
__reflect(MagicBullet010203.prototype, "MagicBullet010203");
