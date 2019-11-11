/**
 * 炮弹031
 */

class Explo031 extends ExploBase {
    public constructor() {
        super();

        this.view = new egret.MovieClip();
        this.addChild(this.view);
        const data = RES.getRes("Explo031json");
        const texture = RES.getRes("Explo31png");
        const mcf: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data,texture);
        this.view.movieClipData = mcf.generateMovieClipData("Explo03_1");
        this.view.anchorOffsetX = this.view.width/2;
    }
}