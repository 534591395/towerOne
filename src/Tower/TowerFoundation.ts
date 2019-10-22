/**
 * 防御塔基类， 继承地基基类（建筑依赖地基）
 */

class TowerFoundation extends Foundation {
    
    /** 添加子类的层，外部场景中的对象层，放置武器，武器层在关卡场景里统一管理，故需要这个对象 */
    public parentContentLayer: egret.DisplayObjectContainer;

    /** 位于舞台的坐标x,y(椭圆圆心)，攻击范围是一个椭圆 */
    public sx: number;
    public sy: number;
    /**敌人集合 */
    public targets: any[] = [];
    /**进入射程的敌人集合(涉及排序 优先攻击距离终点最近者)*/
    public atargets: any[] = [];
    /**售卖价格*/
    public sellPrice: number;
    
    /**射程范围最大半径*/
    public maxRadius: number = 140;
    /**射程范围最小半径*/
    public minRadius: number = 100;
    /**将圆沿y轴压扁变为椭圆时候的比例*/
    public ratioY: number;

    public constructor() {
        super();
    }

    // 销毁
    public destory() {
        
    }

    public onEnterFrame(timeStamp:number) {}

    // 初始化
    public init() {
        
    }
}