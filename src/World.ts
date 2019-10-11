/**
 * 世界地图类（关卡选择界面）
 */

class World extends eui.Component {
    private backToIndex: eui.Image;
    private heroIcon: eui.Image;

    // 关卡旗帜集合
    private flagArr: any[] = [];

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
        this.defalutFlag();
    }

    // 初始化关卡旗帜属性
    private defalutFlag() {
        const arr = GuanKa.getData();
        arr.map((item, i) => {
            // 该关卡已通关后颜色变化
            const flag: eui.Image = this[item.name]; 
            if (flag) {
                if (item.ispass) {
                    flag.source = RES.getRes("flag1");
                }
                flag.touchEnabled = true;
                flag.addEventListener(egret.TouchEvent.TOUCH_TAP, this.choseGuanka, this);
                this.flagArr.push(flag);
                // 显示动画
                egret.Tween.get(flag).to({ alpha: 1, y: flag.y+30 },300 + i*0.1+1);
            }
        });
    } 

    // 返回主界面
    private backRun():void {
        this.backToIndex.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.backRun,this);

        this.dispatchEvent(new MainEvent(MainEvent.OpenLoadBar,"welcomeload"));

        SoundManager.stopBgSound();
    }

    // 选择某个关卡
    private choseGuanka() {} 
}