/**
 * 炮弹02
 */

class Explo02 extends ExploBase {
    public constructor() {
        super();

        this.view = new egret.MovieClip();
        this.addChild(this.view);
        const data = RES.getRes("Explo02json");
        const texture = RES.getRes("Explo02png");
        const mcf: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data,texture);
        this.view.movieClipData = mcf.generateMovieClipData("Explo02");
        this.view.anchorOffsetX = this.view.width/2;
    }
}