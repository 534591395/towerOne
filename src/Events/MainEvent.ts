/**
 * 主类事件--游戏主线路自定义事件
 */

class MainEvent extends egret.Event {
    // 触发游戏开始时调用该事件类型
    public static GameStart:string = '游戏开始';

    private _resName: string = ""; 

    public constructor(type:string, bubbles:boolean=false, cancelable:boolean=false, resName:string="") {
        super(type, bubbles, cancelable);
        this._resName = resName;
    }

    public get resName(): string {
        return this._resName;
    }
}