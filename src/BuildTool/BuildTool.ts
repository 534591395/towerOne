/**
 * 防御塔建造工具类
 */

class BuildTool extends eui.Component {
    
    private topLeftGroup: eui.Group;
    private topRightGroup: eui.Group;
    private bottomLeftGroup: eui.Group;
    private bottomRightGroup: eui.Group;
    private topMiddleGroup: eui.Group;
    private bottomMiddleGroup: eui.Group; 

    private gold: number;

    public constructor(obj: any, gold: number) {
        super();
        this.skinName = "resource/skins/buildTool.exml";;
        // 当前关卡拥有的金币
        this.gold = gold;
        this.width = 164;
        this.height = 162;

        this.createTools(obj);
    }
    
    private createTools(obj: any) {
        // LockTower 锁住 -- 当前未实现该功能
        // 选中的是地基类
        if (obj instanceof Foundation01) {
            // 箭塔
            this.addIcon("ArrowTower01",  this.topLeftGroup);
            // 盾塔--士兵小队
            this.addIcon("ShieldTower01",  this.topRightGroup);
            // 魔法塔
            this.addIcon("MagicTower01", this.bottomLeftGroup);
            // 炮塔
            this.addIcon("ExplodeTower01", this.bottomRightGroup);
        } else
        // 选中的是一级箭塔
        if (obj instanceof ArrowTower01) {
            // 若选中的箭塔等级范围是 1-2之间，显示普通升级icon
            // 升级到2级的icon
            this.addIcon("ArrowTower02", this.topMiddleGroup);
            this.addIcon("SellTower", this.bottomMiddleGroup); 
        }else 
        // 选择的是二级箭塔
        if (obj instanceof ArrowTower02) {
            this.addIcon("ArrowTower03_1", this.topLeftGroup);
            this.addIcon("ArrowTower03_2", this.topRightGroup);
            this.addIcon("SellTower", this.bottomMiddleGroup);
        } else
        // 选中的是一级防御塔
        if (obj instanceof ShieldTower01) {
            // 升级到2级的icon
            this.addIcon("ShieldTower02", this.topMiddleGroup);
            this.addIcon("SellTower", this.bottomMiddleGroup); 
        }  else
        // 选择的是二级防御塔
        if (obj instanceof ShieldTower02) {
            this.addIcon("ShieldTower03_1", this.topLeftGroup);
            this.addIcon("ShieldTower03_2", this.topRightGroup);
            this.addIcon("SellTower", this.bottomMiddleGroup);
        } else
        // 选择的是一级魔法塔
        if (obj instanceof MagicTower01) {
            // 升级到2级的icon
            this.addIcon("MagicTower02", this.topMiddleGroup);
            this.addIcon("SellTower", this.bottomMiddleGroup); 
        } else
        // 选择的是二级魔法塔
        if (obj instanceof MagicTower02) {
            this.addIcon("MagicTower03_1", this.topLeftGroup);
            this.addIcon("MagicTower03_2", this.topRightGroup);
            this.addIcon("SellTower", this.bottomMiddleGroup);
        }
         else {
            // 只有卖出icon
            this.addIcon("SellTower", this.bottomMiddleGroup); 
        }
    }

    private addIcon(type: string, direction: eui.Group) {
        const icon = new BuildIcon(type, this.gold);
        direction.addChild(icon);
        icon.touchEnabled = true;
        icon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleIconTouch, this);
    }

    // 点击建筑icon事件，触发自定义事件
    private handleIconTouch(e: egret.TouchEvent) {
        // 该建筑建造的价格
        const price = e.currentTarget.price;
        // 判断用户当前关卡拥有的金币数大于建筑建造的价格
        if (this.gold >= price) {
            this.dispatchEvent(new ToolEvent(ToolEvent.BuildStart, e.currentTarget.className, price));
        }
    }

    // 隐藏工具
    public hide():void {
        this.parent.removeChild(this);
    }
}