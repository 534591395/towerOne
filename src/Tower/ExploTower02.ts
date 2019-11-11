/**
 * 炮塔-02
 */

class ExploTower02 extends ExploTowerBase {
    public constructor() {
        super();
        this.minRadius = 100;
        this.maxRadius = 140;
        this.ratioY = this.minRadius / this.maxRadius;
        this.damage = 12;

        this.view = new egret.MovieClip();
        this.addChild(this.view);
        const data = RES.getRes("ExploTower02json");
        const texture = RES.getRes("ExploTower02png");
        const mcf: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data,texture);
        this.view.movieClipData = mcf.generateMovieClipData("ExploTower02");
        this.view.anchorOffsetX = this.view.width/2;
        this.view.x = this.view.width / 2;

        this.weaponClassName = 'Explo02';
    }

    public onEnterFrame(timeStamp:number) {
        super.onEnterFrame(timeStamp);
        // 开火
        this.fire(timeStamp);
    }
}