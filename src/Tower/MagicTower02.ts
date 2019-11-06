/**
 * 魔法塔-02
 */

class MagicTower02 extends MagicTowerBase {
    public constructor() {
        super();
        this.minRadius = 100;
        this.maxRadius = 140;
        this.ratioY = this.minRadius / this.maxRadius;
        this.anchorOffsetX = this.width/2;
        this.addChild(Utiles.createBitmapByName("MagicTower02"));
        this.damage = 14;
        // 加入魔法师
        this.shooter = new MagicWizard010203();
        this.shooter.x = 43;
        this.shooter.y = 6;
        this.addChild(this.shooter);
    }

    public onEnterFrame(timeStamp:number) {
        super.onEnterFrame(timeStamp);
        this.shooter.onEnterFrame(timeStamp);
        // 开火
        this.fire(timeStamp);
    }
}