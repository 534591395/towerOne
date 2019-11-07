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
        return _super.call(this) || this;
    }
    MagicBullet010203.prototype.onCreate = function () {
    };
    MagicBullet010203.prototype.init = function (p, tar, offy) {
    };
    MagicBullet010203.prototype.onEnterFrame = function (timeStamp) {
        _super.prototype.onEnterFrame.call(this, timeStamp);
    };
    return MagicBullet010203;
}(MagicBulletBase));
__reflect(MagicBullet010203.prototype, "MagicBullet010203");
