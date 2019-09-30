/**
 * 游戏运行入口 ，当加载资源完毕后点击开始按钮，触发加载该模块
 */

class Run extends egret.DisplayObjectContainer {
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        // 播放背景音乐
        SoundManager.playBgSound("gamebgsound");

        // 添加背景图片
        let bg = Utiles.createBitmapByName("welbg");
        // 先透明
        bg.alpha = 0;
        this.addChild(bg);
        // 再添加缓动动画效果，慢慢显示出来
        egret.Tween.get(bg).wait(500).to({alpha: 1}, 800);

        // logo动画效果
        let logo = Utiles.createBitmapByName("wellogo");
        logo.anchorOffsetX = 0.5;
        logo.anchorOffsetY = 1;
        logo.x = this.stage.stageWidth;
        logo.y = - logo.height;
        this.addChild(logo);
        
  
        TweenMax.fromTo(logo,0.2,{y:-logo.height,scaleX:0.1,rotation:40},{delay:1.3,y:this.stage.stageHeight/2+70,scaleX:1,rotation:0,ease:Circ.easeOut});
    }
}