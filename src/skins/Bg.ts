class Bg extends eui.Component  {
    private btn: eui.Image; 
    private start: egret.tween.TweenItem;

    public constructor() {
        super();
        this.skinName = "resource/skins/bg.exml";
        this.animate();
    }

    private animate() {
        // 点击开始触发动画效果
        this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            this.start.play(0);
        }, this);
        // 动画播放结束监听
        this.start.addEventListener('complete', () => {}, this);
    }
}