/**
 * 玩家技能召唤出来的增援士兵 类型2
 */

class Reinforcements2 extends ReinforcementsBase {
    public constructor() {
        super();
        
        this.addTexture();
    }

    private addTexture(){
        //获取贴图
        const data = RES.getRes("ZenYuan2json");
        const texture = RES.getRes("ZenYuan2png");
        const mcf: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data,texture);
        this.view.movieClipData = mcf.generateMovieClipData("ZenYuan2");
        this.view.x = this.view.width / 2;
        this.view.anchorOffsetX = this.view.width / 2;
        //血条位置
        this.lifeBar.x = 27;
        this.lifeBar.y = 5;
        this.maxSpeed = 0.6;
        
        this.fireDelay = 1000;
	}
}