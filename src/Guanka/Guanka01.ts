/**
 * 游戏关卡一
 */

class Guanka01 extends GuankaBase {
    public constructor() {
        super();
        console.log("游戏关卡一");

        this.backgroundImage.texture = Utiles.createBitmapByName("map0").texture;

        this.createUI();
    }
}