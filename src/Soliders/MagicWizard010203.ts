/**
 * 魔法师种类1
 */

class MagicWizard010203 extends MagicWizardBase {
    public constructor() {
        super();
        
        const data = RES.getRes("MagicWizard010203json");
        const texture = RES.getRes("MagicWizard010203png");
        const mcf: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, texture);
        // 重新设置播放数据源
        this.movieClipData = mcf.generateMovieClipData("MagicWizard010203");

        // 初始化播放帧标签
        this.stateLabel = "idleDown";
        this.idleLabel = "idleDown";

        this.anchorOffsetX = this.width/2;
    }
}