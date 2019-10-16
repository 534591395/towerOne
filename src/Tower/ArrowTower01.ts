/**
 * 箭塔--等级：一级， 地基为 ArrowTowerFoundation
 */

class ArrowTower01 extends ArrowTowerFoundation {

    // 箭塔上有两个弓箭手
    private shooter01: ArrowShooter01;
    private shooter02: ArrowShooter01;


    public constructor() {
        super();

        this.addChild(Utiles.createBitmapByName("ArrowTower01"));

        // 加入弓箭手
        this.shooter01 = new ArrowShooter01();
        this.shooter01.x = 36;
        this.shooter01.y = 15;
        this.addChild(this.shooter01);
        
        this.shooter02 = new ArrowShooter01();
        this.shooter02.x = 50;
        this.shooter02.y = 15;
        this.addChild(this.shooter02);
    }

    // 帧率执行回调方法
    public onEnterFrame() {
        super.onEnterFrame();
    }
}