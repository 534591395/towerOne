/**
 * 防御塔建造工具类
 */

class BuildTool extends eui.Component {
    
    private topLeftGroup: eui.Group;
    private topRightGroup: eui.Group;
    private bottomLeftGroup: eui.Group;
    private bottomRightGroup: eui.Group; 

    private gold: number;

    public constructor(obj: any, gold: number) {
        super();
        this.skinName = "resource/skins/buildTool.exml";;
        // 当前关卡拥有的金币
        this.gold = gold;

        this.createTools(obj);
    }
    
    private createTools(obj: any) {
        // 选中的是地基类
        if (obj instanceof Foundation01) {
            this.addIcon("ArrowTower01",  this.topLeftGroup);
        }
    }

    private addIcon(type: string, direction: eui.Group) {
        const icon = new BuildIcon(type, this.gold);
        this.addChild(icon);
        icon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleIconTouch, this);
    }

    // 点击建筑icon事件，触发自定义事件
    private handleIconTouch(e: egret.TouchEvent) {
        
    }
}