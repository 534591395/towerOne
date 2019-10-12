/**
 * 关卡基类
 */

class GuankaBase extends eui.Component {
    // 地图位图
    public backgroundImage: egret.Bitmap;
    // UI特效层、提示层
    protected uiLayer: egret.DisplayObjectContainer;
    // 地基层
    protected uiFoundation: egret.DisplayObjectContainer;
    // 关卡UI对象
    protected guankaUI: GuankaUI;
    // 地基坐标集合
    protected foundationPosiotionArr: number[][] = [];
    // 地基实例集合
    protected foundationArr: Foundation[] = [];


    constructor() {
        super();

        // 背景图片
        this.backgroundImage = new egret.Bitmap();
        this.addChild(this.backgroundImage);

        // 地基层
        this.uiFoundation = new egret.DisplayObjectContainer();
        this.addChild(this.uiFoundation);
        

        this.uiLayer = new egret.DisplayObjectContainer();
        this.addChild(this.uiLayer);
    }

    // 生成UI特效层、提示层
    protected createUI() {
        this.guankaUI = new GuankaUI();
        this.uiLayer.addChild(this.guankaUI);

        this.uiLayer.addEventListener(MainEvent.QuitGuanka, this.handleBackToWorld, this);
    }

    // 退出关卡，回到事件地图界面
    private handleBackToWorld() {
        this.dispatchEvent(new MainEvent(MainEvent.OpenLoadBar, "maps"));
    }

    // 创建地基，标记可以造箭塔的位置
    protected createFoundation(classFactory:any) {
        this.foundationPosiotionArr.map((item,i) => {
            let foundation = new classFactory();
            foundation.x = item[0];
            foundation.y = item[1];
            foundation.index = i;
            this.uiFoundation.addChild(foundation);
            this.foundationArr.push(foundation);
            foundation.touchEnabled = true;
        });
    }
}