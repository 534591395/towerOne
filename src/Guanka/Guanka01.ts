/**
 * 游戏关卡一
 */

class Guanka01 extends GuankaBase {
    public constructor() {
        super();
        console.log("游戏关卡一");

        // 设置地基坐标集合，当前手动设置
        this.foundationPosiotionArr = [[484,266],[436,316],[354,316],[314,266],[354,206],[436,206],[634,316],[394,436],[228,141]];

        this.createUI();

        this.backgroundImage.source = Utiles.createBitmapByName("map0").texture;
         
        this.createFoundation(Foundation01);

        this.default();
    }
    
    // 初始化数据
    public default() {
        this.gold = 250;
        this.guankaUI.setGold(this.gold);
        this.life = 20;
        this.guankaUI.setLife(this.life);

        //播放背景音乐
        //SoundManager.playBgSound("map0bg");
    }
}