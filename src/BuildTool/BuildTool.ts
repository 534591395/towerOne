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
        this.width = 164;
        this.height = 162;

        this.createTools(obj);
    }
    
    private createTools(obj: any) {
        // 选中的是地基类
        if (obj instanceof Foundation01) {
            // 箭塔
            this.addIcon("ArrowTower01",  this.topLeftGroup);
            // 盾塔
            this.addIcon("ShieldTower01",  this.topRightGroup);
            // 魔法塔
            this.addIcon("MagicTower01", this.bottomLeftGroup);
            // 炮塔
            this.addIcon("ExplodeTower01", this.bottomRightGroup);
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
        alert('xx')
    }

    // 隐藏工具
    public hide():void {
        this.parent.removeChild(this);
    }
}