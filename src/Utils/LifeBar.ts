/**
 * 血条
 */

class LifeBar extends egret.DisplayObjectContainer {

    private bar: egret.Bitmap;

    public constructor() {
        super();

        const bg = Utiles.createBitmapByName("lifeBarBg");
        this.addChild(bg);
        const bar = Utiles.createBitmapByName("lifeBar");
        this.addChild(bar);
        bar.x = bar.y = 1;
        // 启动纹理缓存
        this.cacheAsBitmap = true;
        this.bar = bar;
    }

    // 血条--扣血进度展示  hp 当前生命值 life 总生命值
    public setProgress(hp: number, life: number) {
        const num:number = (hp/life) * 18;
        const per:number = num < 0 ? 0 : num;
        this.bar.width = per;
    }

    // 重置血条
    public reset() {
        this.bar.width = 18;
    }
}