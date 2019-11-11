/**
 * 炮塔-01
 */

class ExploTower01 extends ExploTowerBase {
    public constructor() {
        super();
        this.minRadius = 100;
        this.maxRadius = 140;
        this.ratioY = this.minRadius / this.maxRadius;
        this.damage = 6;

        this.view = new egret.MovieClip();
        this.addChild(this.view);
        const data = RES.getRes("ExploTower01json");
        const texture = RES.getRes("ExploTower01png");
        const mcf: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data,texture);
        this.view.movieClipData = mcf.generateMovieClipData("ExploTower01");
        this.view.anchorOffsetX = this.view.width/2;
        this.view.x = this.view.width / 2;

        this.weaponClassName = 'Explo01';
    }

    public onEnterFrame(timeStamp:number) {
        super.onEnterFrame(timeStamp);
        // 开火
        this.fire(timeStamp);
    }
}