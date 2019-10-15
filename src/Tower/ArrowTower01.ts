/**
 * 箭塔--等级：一级， 地基为 ArrowTowerFoundation
 */

class ArrowTower01 extends ArrowTowerFoundation {
    public constructor() {
        super();

        this.addChild(Utiles.createBitmapByName("ArrowTower01"));
    }
}