/**
 * 盾塔-等级：一级--   士兵小队
 */

class ShieldTower01 extends ShieldTowerBase {
    public constructor() {
        super();

        this.minRadius = 100;
        this.maxRadius = 140;
        this.ratioY = this.minRadius / this.maxRadius;

        this.addChild(Utiles.createBitmapByName("ShieldTower01"));
    }
}