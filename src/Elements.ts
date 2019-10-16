/**
 * 场景中所有可被摧毁的对象的基类 塔除外
 */

class Elements extends egret.DisplayObjectContainer {
    // 敌人目标集合
    public targets: any[] = [];
    // 攻击力
    public damage: number;
    // 是否可清除
    public canClear: boolean = false;
    // 对象层
    public parentContentLayer: egret.DisplayObjectContainer;

    public constructor() {
        super();
    }

    // 创建
    public onCreate():void {}

    // 销毁
    public onDestroy():void {
        if (this && this.parent) {
            this.parent.removeChild(this);
        }
    }

    // 打击效果
    public onHit():void {}

    // 实时刷新
    public onEnterFrame(advancedTime :number):void {}

    // 移动
    public move() {}

    
}