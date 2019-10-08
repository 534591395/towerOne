/**
 * 游戏运行入口 ，当加载资源完毕后点击开始按钮，触发加载该模块
 * 
 * TweenMax 补间动画 文档地址：https://www.tweenmax.com.cn/api/tweenmax/
 */

class Run extends egret.DisplayObjectContainer {
    private logo: egret.Bitmap;
    private btn: egret.Bitmap;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        // 播放背景音乐
        SoundManager.playBgSound("gamebgsound");

        // 下面的所有UI效果，当前编码实现，后续若改动频繁可用皮肤来实现。

        // 添加背景图片
        let bg = Utiles.createBitmapByName("welbg");
        // 先透明
        bg.alpha = 0;
        this.addChild(bg);
        // 再添加缓动动画效果，慢慢显示出来
        egret.Tween.get(bg).wait(500).to({alpha: 1}, 800);

        // logo动画效果
        let logo = Utiles.createBitmapByName("wellogo");
        logo.x = (this.stage.stageWidth - logo.width) / 2;
        logo.y = -logo.height;
        this.addChild(logo);
        
        
        TweenMax.fromTo(logo, 0.2 ,{y:-logo.height,scaleX:0.1,rotation: 0},{delay:1.3,y: 10,scaleX:1,rotation:0,ease:Circ.easeOut});

        egret.Tween.get(logo).wait(1450).to({ scaleX: 0.9 },100).to({ scaleX: 1 },100);
        egret.Tween.get(logo).wait(1460).to({ scaleY: 1.1 },100).to({ scaleY: 1 },100).call(this.showDrops, this);

        this.logo = logo;
    }

    // 藤条下挂"游戏"按钮
    private showDrops() {
        let dropsGrop = new egret.Sprite();
        dropsGrop.x = 0;
        // 添加后面的微调值，是为了下面藤条显示出来的时候不会唐突
        dropsGrop.y = this.logo.y + 60;
        this.addChildAt(dropsGrop, 1);

        // 藤条
        let tentiao = Utiles.createBitmapByName('liantiao');
        tentiao.x = (this.stage.stageWidth - tentiao.width) / 2;
        tentiao.y = 0;
        dropsGrop.addChild(tentiao);

        // '游戏'按钮
        let btn = Utiles.createBitmapByName('welbtn');
        btn.y = 50;
        btn.x = (this.stage.stageWidth - btn.width) / 2;
        dropsGrop.addChild(btn);
        
        // 效果：从上往下渐变显示
        egret.Tween.get(dropsGrop).to({ y: this.logo.height - this.logo.y - 20 }, 600, egret.Ease.bounceOut).call(this.addRunEvent, this);

        this.btn = btn;
    }

    // 给'游戏'按钮添加事件
    private addRunEvent() {
        // 开启触摸监听
        this.btn.touchEnabled = true;
        // 手指抬起接触点
        this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.checked, this);
    }

    private checked() {
        this.btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.checked, this);
        // 打开加载进度界面，加载下一个场景的资源
        this.dispatchEvent(new MainEvent(MainEvent.OpenLoadBar,"maps"));
        // 停止音效
        SoundManager.stopBgSound();
    }

    // 手动清除静态资源缓存
    public destroy() {
        RES.destroyRes('welbg');
        RES.destroyRes('wellogo');
        RES.destroyRes('liantiao');
        RES.destroyRes('welbtn');
    }
}