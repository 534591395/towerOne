/**
 * 盾塔-等级：三级 02--   士兵小队
 */

class ShieldTower03_2 extends ShieldTowerBase {
    public constructor() {
        super();

        this.minRadius = 100;
        this.maxRadius = 140;
        this.ratioY = this.minRadius / this.maxRadius;

        this.addChild(Utiles.createBitmapByName("ShieldTower03_2"));
        
        this.soldierLife = 45;
        this.soldierDamage = 8;
    }
}