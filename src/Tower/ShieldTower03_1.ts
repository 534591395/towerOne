/**
 * 盾塔-等级：三级-类型1--   士兵小队
 */

class ShieldTower03_1 extends ShieldTowerBase {
    public constructor() {
        super();

        this.minRadius = 100;
        this.maxRadius = 140;
        this.ratioY = this.minRadius / this.maxRadius;

        this.addChild(Utiles.createBitmapByName("ShieldTower03_1"));
        
        this.soldierLife = 35;
        this.soldierDamage = 6;
    }
}