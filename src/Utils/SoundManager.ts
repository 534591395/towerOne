/**
 * 声音播放管理类
 * 官方文档：http://developer.egret.com/cn/github/egret-docs/Engine2D/multimedia/audio/index.html
 * http://developer.egret.com/cn/apidoc/index/name/egret.Sound
 */

class SoundManager {
    // 背景音乐播放通道
    private static channel: egret.SoundChannel;

    // 播放背景音乐
    public static playBgSound(name: string, startTime:number = 0 ,loops: number = 0) {
        let bgSound: egret.Sound = RES.getRes(name);
        // [静态] 背景音乐
        bgSound.type = egret.Sound.MUSIC;
        this.channel = bgSound.play(startTime, loops);
    }

    // 停止播放背景音乐
    public static stopBgSound() {
        this.channel.stop();
    }

    // 播放音效
    public static playEffect(name:string, value:number=1) {
        let sound: egret.Sound = RES.getRes(name);
        sound.type = egret.Sound.EFFECT;

        let channel: egret.SoundChannel = sound.play(0, 1);
        // 设置播放音量
        channel.volume = value;
    }
}