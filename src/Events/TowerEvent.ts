/**
 * 防御塔相关自定义事件
 */

class TowerEvent extends egret.Event {
    public static ShowTool: string = '显示创建防御塔的UI';
    public static HideTool: string = '隐藏创建防御塔的UI';

    private _obj: any;

    public constructor(type:string, obj:any=null,  bubbles:boolean=false, cancelable:boolean=false) {
        super(type,bubbles,cancelable);
        this._obj = obj;
    }

    public get obj():any {
        return this._obj;
    }

}