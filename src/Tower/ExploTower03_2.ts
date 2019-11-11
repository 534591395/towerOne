/**
 * 炮塔-03_2
 */

class ExploTower03_2 extends ExploTowerBase {
    public constructor() {
        super();
        this.minRadius = 100;
        this.maxRadius = 140;
        this.ratioY = this.minRadius / this.maxRadius;
        this.damage = 24;

        this.view = new egret.MovieClip();
        this.addChild(this.view);
        const data = RES.getRes("ExploTower031json");
        const texture = RES.getRes("ExploTower031png");
        const mcf: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data,texture);
        this.view.movieClipData = mcf.generateMovieClipData("ExploTower03_1");
        this.view.anchorOffsetX = this.view.width/2;
        this.view.x = this.view.width / 2;

        this.weaponClassName = 'Explo031';
    }

    public onEnterFrame(timeStamp:number) {
        super.onEnterFrame(timeStamp);
        // 开火
        this.fire(timeStamp);
    }
}