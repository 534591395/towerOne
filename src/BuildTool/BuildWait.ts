/**
 * 建筑等待动画
 */

class BuildWait extends egret.DisplayObjectContainer {
    // 建筑塔类型-- 根据该类型名来确定显示的建筑底部ui
    private buildType: any = {"ArrowTower01":"building1","ShieldTower01":"building2","MagicTower01":"building3","ExploTower01":"building4"};
    
    // 建筑索引，跟塔一一对应
    public index: number;

    private barbgTop: egret.Bitmap;
    
    public constructor(towerName: string, index: number) {
        super();
        
        this.index = index;

        this.addChild(Utiles.createBitmapByName(this.buildType[towerName]));
        
        // 进度条-未开始的，打底的
        const barbg = Utiles.createBitmapByName("buildbarbg");
        barbg.x = 23;
        barbg.y = 23;
        this.addChild(barbg);
        // 进度条-开始中的，显示进度的
        const barbgTop = Utiles.createBitmapByName("buildbartop");
        barbgTop.x = 24;
        barbgTop.y = 24;
        barbgTop.width = 1;
        this.barbgTop = barbgTop;
        this.addChild(this.barbgTop);
        
        this.building();
        // 播放建筑音效
        SoundManager.playEffect("building");
    }

    // 建筑动画
    private building() {
        TweenLite.to(this.barbgTop, 1.5, { width: 37, ease: Linear.easeNone, onComplete: () => {
            this.dispatchEvent(new ToolEvent(ToolEvent.BuildComplete));
        } });
    }
}