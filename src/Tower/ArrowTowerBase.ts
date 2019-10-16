/**
 * 箭塔基类-箭塔的地基
 */

class ArrowTowerFoundation extends TowerFoundation {
    // 射击方向
    protected direct: string;
    // 先左边攻击还是先右边攻击
    protected firststrike: string = "R";
    // 单一目标
    protected target: any;

    public constructor() {
        super();
    }

    // 帧率执行回调方法
    public onEnterFrame(timeStamp:number) {
        
    }
}