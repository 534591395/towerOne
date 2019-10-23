/**
 * 弓箭手02  动画
 */

class ArrowShooter02 extends ArrowShooterBase {
    public constructor() {
        super();
        // 锚点居中,士兵 width = 20。
        this.anchorOffsetX = 10;

        const data = RES.getRes("ArrowShooter02json");
        const texture = RES.getRes("ArrowShooter02png");
        const mcf: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, texture);
        // 重新设置播放数据源
        this.movieClipData = mcf.generateMovieClipData("ArrowShooter02");

        // 初始化播放帧标签
        this.startLabel = "";
        this.endLabel= "";
        this.idleLabel = "idleDown";
    }
}