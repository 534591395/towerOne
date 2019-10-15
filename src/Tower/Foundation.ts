/**
 * 地基的基类-- 添加防御塔的地基
 */

class Foundation extends egret.DisplayObjectContainer implements InnerGroupItem {
   // 地基的索引
   public index: number; 

    public constructor() {
        super();
    }
    
    // 选中
    public selectItem():void {
        this.dispatchEvent(new TowerEvent(TowerEvent.ShowTool, this));
    }
    
    // 取消
    public deselectItem():void {
        this.dispatchEvent(new TowerEvent(TowerEvent.HideTool, this));
    }
    
    // 重置
    public reselectItem(): void {
        this.dispatchEvent(new TowerEvent(TowerEvent.HideTool, this));
        Group.dispose();
    }
}