/**
 * 关卡UI，比如 技能面板、生命值面板、金币面板、操作面板等
 * 
 */

class GuankaUI extends eui.Component {
     // 点击返回到世界地图页
     private backToWorldBtn: eui.Image;
     // 显示生命
     private lifeLeftTxt: eui.BitmapLabel;
     // 显示金币
     private goldTxt: eui.BitmapLabel;
     // 显示轮次
     private roundTxt: eui.BitmapLabel;
     
     // 背景图片（地图）
     public backgroundImage: eui.Image;

    constructor() {
        super();
        this.skinName= "resource/skins/guankaUI.exml";

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage():void {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);

        this.backToWorldBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleBackToWorld, this);
    }

    // 触发返回到世界地图界面
    private handleBackToWorld() {
        // 允许该事件冒泡
        this.dispatchEvent(new MainEvent(MainEvent.QuitGuanka, null, true));
    }

    // 设置生命
    public setLife(num:number) {
        this.lifeLeftTxt.text = num.toString();
    }

    // 设置金币数量
    public setGold(num:number) {
        this.goldTxt.text = num.toString();
    }

    // 显示轮次
    public setRound(currentRound:number, totalRound:number) {
        this.roundTxt.text = currentRound.toString() + "/" + totalRound.toString();
    }

    // 实时刷新
    public onEnterFrame(timeStamp:number) {

    }
}