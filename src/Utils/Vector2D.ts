/**
 * 2D向量类--封装了常用操作方法
 */

class Vector2D {
    private _x: number;
    private _y: number;

    public constructor(x: number = 0, y: number = 0) {
        this._x = x;
        this._y = y;
    }

    // 绘制线条表示向量，调试用
    public draw(graphics:egret.Graphics, color:number = 0):void{
        graphics.lineStyle(0, color);
        graphics.moveTo(0, 0);
        graphics.lineTo(this._x, this._y);
    }

    // 复制当前向量
    public clone(): Vector2D {
        return new Vector2D(this.x, this.y);
    }


    public set x(value: number) {
        this._x = value;
    }
    public get x(): number {
        return this._x;
    }

    public set y(value: number) {
        this._y = value;
    }
    public get y(): number {
        return this._y;
    } 


}