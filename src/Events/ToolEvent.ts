/**
 * 建筑工具相关自定义事件
 */

class ToolEvent extends egret.Event {
    public static BuildStart: string = "开始建筑";
    public static BuildComplete: string = "建筑完成";

    private _price: number = 0;
    private _className: string = '';

    public constructor(type: string, className: string = "", price:number=0, bubbles: boolean = false, cancelable: boolean = false) {
        super(type,bubbles,cancelable);
        this._className = className;
        this._price = price;
    }

    public get className(): string {
        return this._className;
    }

    public get price(): number {
        return this._price;
    }
}