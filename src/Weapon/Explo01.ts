/**
 * 炮弹01
 */

class Explo01 extends ExploBase {
    public constructor() {
        super();

        this.view = new egret.MovieClip();
        this.addChild(this.view);
        const data = RES.getRes("Explo01json");
        const texture = RES.getRes("Explo01png");
        const mcf: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data,texture);
        this.view.movieClipData = mcf.generateMovieClipData("Explo01");
        this.view.anchorOffsetX = this.view.width/2;
    }
}