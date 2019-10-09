/**
 * 主类事件--游戏主线路自定义事件
 */

class MainEvent extends egret.Event {
    // 触发游戏开始时调用该事件类型
    public static GameStart:string = '游戏开始';

    public static OpenLoadBar:string = '打开场景加载进度条';

    public static StartLoadBar:string = '开始加载资源';

    public static LoadAnimateComplete:string = '资源加载完成，动画播放结束';

    private _resName: string = ""; 

    public constructor(type:string, resName:string="", bubbles:boolean=false, cancelable:boolean=false) {
        super(type, bubbles, cancelable);
        this._resName = resName;
    }

    public get resName(): string {
        return this._resName;
    }
}