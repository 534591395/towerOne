/**
 * 建筑工具的icon类（对应的图标）
 */

class BuildIcon extends egret.DisplayObjectContainer {
    
    // 建筑价格
    public price: number;

    // 当前关卡玩家拥有的金币
    public gold: number;

    // 对应的防御塔类名
    public className: string;

    public constructor(towerName: string, gold: number) {
        super();

        this.gold = gold;

        // 资源配置
        const towerConfig = TowerLevel.data[towerName];

        this.className = towerConfig.className;
        this.price = towerConfig.price;

        // 添加图片资源图标
        this.addChild(Utiles.createBitmapByName(towerConfig.res));
    }
}