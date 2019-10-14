/**
 * 对象管理类--选择对象相关
 */

class Group {
    public static selectedItem: any;
    
    // 选择
    public static selectItem(item:any):void {
        if (!item) {
            return;
        }
        if (Group.selectedItem) {
            // 若重复选择了某个对象，就重置（比如：取消选中）
            if (Group.selectedItem === item) {
                //重置  reselectItem  请查看接口 InnerGroupItem 类
                Group.selectedItem.reselectItem();
                return;
            }
            // 取消选择
            Group.selectedItem.deselectItem();
        }
        // 赋值为新的选中对象 
        Group.selectedItem = item;
        Group.selectedItem.selectItem();
        // 播放选中音效
        SoundManager.playEffect("select");
    }

    // 销毁
    public static dispose():void {
        Group.selectedItem = null;
    }
}