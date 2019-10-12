/**
 * 关卡基类
 */

class GuankaBase extends eui.Component {
    // 地图位图
    public backgroundImage: egret.Bitmap;
    // UI特效层、提示层
    protected uiLayer: egret.DisplayObjectContainer;
    // 关卡UI对象
    protected guankaUI: GuankaUI;


    constructor() {
        super();

        // 背景图片
        this.backgroundImage = new egret.Bitmap();
        this.addChild(this.backgroundImage);
        

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
}