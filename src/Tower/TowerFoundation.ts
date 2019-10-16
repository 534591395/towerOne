/**
 * 防御塔基类， 继承地基基类（建筑依赖地基）
 */

class TowerFoundation extends Foundation {
    
    // 添加子类的层，外部场景中的对象层，放置武器，武器层在关卡场景里统一管理，故需要这个对象
    public parentContentLayer: egret.DisplayObjectContainer;

    // 位于舞台的坐标x,y(椭圆圆心)，攻击范围是一个椭圆
    public sx: number;
    public sy: number;

    public constructor() {
        super();
    }

    // 销毁
    public destory() {
        
    }
}