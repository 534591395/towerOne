/**
 * 盾塔-等级：二级--   士兵小队
 */

class ShieldTower02 extends ShieldTowerBase {
    public constructor() {
        super();

        this.minRadius = 100;
        this.maxRadius = 140;
        this.ratioY = this.minRadius / this.maxRadius;

        this.addChild(Utiles.createBitmapByName("ShieldTower02"));
        
        this.soldierLife = 25;
        this.soldierDamage = 4;
    }
}