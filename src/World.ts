/**
 * 世界地图类（关卡选择界面）
 */

class World extends eui.Component {
    private flag01: eui.Image;
    private backToIndex: eui.Image;
    private heroIcon: eui.Image;

    public constructor() {
        super();
        this.skinName = "resource/skins/world.exml";
        // 播放背景音乐
        SoundManager.playBgSound("mapbgsound");
      
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage() {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.guanka();
    }

    private guanka():void {
        TweenMax.to(this.backToIndex, 0.5, {delay: 1, y: 421, ease: Cubic.easeInOut});
        TweenMax.to(this.heroIcon, 0.5, {delay: 1, y: 397, ease: Cubic.easeInOut});

        this.backToIndex.touchEnabled = true;
        this.backToIndex.addEventListener(egret.TouchEvent.TOUCH_TAP, this.backRun, this);
    }

    // 返回主界面
    private backRun():void {
        this.backToIndex.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.backRun,this);

        this.dispatchEvent(new MainEvent(MainEvent.OpenLoadBar,"welcomeload"));

        SoundManager.stopBgSound();
    } 
}