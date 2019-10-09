/**
 * 声音播放管理类
 * 官方文档：http://developer.egret.com/cn/github/egret-docs/Engine2D/multimedia/audio/index.html
 * http://developer.egret.com/cn/apidoc/index/name/egret.Sound
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SoundManager = (function () {
    function SoundManager() {
    }
    // 播放背景音乐
    SoundManager.playBgSound = function (name, startTime, loops) {
        if (startTime === void 0) { startTime = 0; }
        if (loops === void 0) { loops = 0; }
        var bgSound = RES.getRes(name);
        // [静态] 背景音乐
        bgSound.type = egret.Sound.MUSIC;
        this.channel = bgSound.play(startTime, loops);
    };
    // 停止播放背景音乐
    SoundManager.stopBgSound = function () {
        this.channel.stop();
    };
    // 播放音效
    SoundManager.playEffect = function (name, value) {
        if (value === void 0) { value = 1; }
        var sound = RES.getRes(name);
        sound.type = egret.Sound.EFFECT;
        var channel = sound.play(0, 1);
        // 设置播放音量
        channel.volume = value;
    };
    return SoundManager;
}());
__reflect(SoundManager.prototype, "SoundManager");
