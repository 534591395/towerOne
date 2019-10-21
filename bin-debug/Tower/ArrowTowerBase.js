/**
 * 箭塔基类-箭塔的地基
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
var ArrowTowerFoundation = (function (_super) {
    __extends(ArrowTowerFoundation, _super);
    function ArrowTowerFoundation() {
        var _this = _super.call(this) || this;
        /** 先左边攻击还是先右边攻击 */
        _this.firststrike = "R";
        /**开火延迟*/
        _this.fireDelay = 1000;
        /**时间累计*/
        _this.timesum = 0;
        /**音效资源*/
        _this.voiceArr = ["arrow_ready1", "arrow_ready2", "arrow_ready3"];
        //播放音效
        var idx = Math.floor(Math.random() * 3);
        return _this;
        // SoundManager.playEffect(this.voiceArr[idx]);
    }
    /**播放射击音效*/
    ArrowTowerFoundation.prototype.playFireVoice = function () {
        if (Math.random() > 0.5) {
            SoundManager.playEffect("arrow_fire1");
        }
        else {
            SoundManager.playEffect("arrow_fire2");
        }
    };
    // 帧率执行回调方法
    ArrowTowerFoundation.prototype.onEnterFrame = function (timeStamp) {
        var _this = this;
        // 进入攻击范围的敌人
        this.atargets = [];
        this.targets.map(function (item) {
            if (item.target === null) {
                var isIn = Utiles.containsXY(item.x, item.y, _this.sx, _this.sy - 22, _this.maxRadius, _this.ratioY);
            }
        });
    };
    return ArrowTowerFoundation;
}(TowerFoundation));
__reflect(ArrowTowerFoundation.prototype, "ArrowTowerFoundation");
