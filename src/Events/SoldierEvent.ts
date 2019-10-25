/**
 * 士兵相关自定义事件
 */

class SoldierEvent extends egret.Event {
    public static Select: string = '选中';
    public static Deselect: string = '取消选中';
    public static Move: string = '移动';

    private _obj: any;
    // 坐标点集合
    private _arr: number[];

    public constructor(type:string, obj:any=null, arr:number[]=null, bubbles:boolean=false, cancelable:boolean=false) {
        super(type,bubbles,cancelable);
        this._obj = obj;
        this._arr = arr;
    }

    public get obj():any {
        return this._obj;
    }

    public get arr():number[]{
        return this._arr;
    }

}