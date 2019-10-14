/**
 * 关卡基类
 */

class GuankaBase extends eui.Component {
    // 地图位图
    public backgroundImage: eui.Image;
    // UI特效层、提示层
    protected uiLayer: egret.DisplayObjectContainer;
    // 地基层
    protected foundationLayer: egret.DisplayObjectContainer;
    // 关卡UI对象
    protected guankaUI: GuankaUI;
    // 地基坐标集合
    protected foundationPosiotionArr: number[][] = [];
    // 地基实例集合
    protected foundationArr: Foundation[] = [];

    // 选中的地基|塔
    protected selectObj:any;


    constructor() {
        super();

        // UI特效层、提示层
        this.uiLayer = new egret.DisplayObjectContainer();
        this.addChild(this.uiLayer);

        // 地基层
        this.foundationLayer = new egret.DisplayObjectContainer();
        this.addChild(this.foundationLayer);
    }

    // 生成UI特效层、提示层
    protected createUI() {
        this.guankaUI = new GuankaUI();
        this.backgroundImage = this.guankaUI.backgroundImage;
        this.backgroundImage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.bgTouch, this);

        this.uiLayer.addChild(this.guankaUI);

        this.uiLayer.addEventListener(MainEvent.QuitGuanka, this.handleBackToWorld, this);
    }

    // 退出关卡，回到事件地图界面
    private handleBackToWorld() {
        this.dispatchEvent(new MainEvent(MainEvent.OpenLoadBar, "maps"));
    }

    private bgTouch(e: egret.TouchEvent) {
        
    }

    // 创建地基，标记可以造箭塔的位置
    protected createFoundation(classFactory:any) {
        this.foundationPosiotionArr.map((item,i) => {
            let foundation = new classFactory();
            foundation.x = item[0];
            foundation.y = item[1];
            foundation.index = i;
            this.foundationLayer.addChild(foundation);
            this.foundationArr.push(foundation);
            foundation.touchEnabled = true;
            // 监听触摸事件
            foundation.addEventListener(egret.TouchEvent.TOUCH_TAP, this.foundationOrTowerTouch, this);
            // 自定义事件
            foundation.addEventListener(TowerEvent.ShowTool, this.showTool, this);
            foundation.addEventListener(TowerEvent.HideTool, this.hideTool, this);
        });
    }

    // 地基被点击
    private foundationOrTowerTouch(e: egret.TouchEvent) { 
        Group.selectItem(e.currentTarget);
    }

    // 显示建造防御塔的选项工具ui
    private showTool(e: TowerEvent) {
        const touchObj = e.currentTarget;
        this.selectObj = touchObj;
    }

    // 隐藏建造防御塔的选项工具ui
    private hideTool() {

    }
}