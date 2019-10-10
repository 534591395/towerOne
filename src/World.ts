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
        //this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
    }

    private onAddToStage() {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        //this.removeEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
        this.guanka();
    }

    private guanka():void {
        TweenMax.to(this.backToIndex, 0.5, {delay: 1, y: 421, ease: Cubic.easeInOut});
        TweenMax.to(this.heroIcon, 0.5, {delay: 1, y: 397, ease: Cubic.easeInOut});
    } 
}