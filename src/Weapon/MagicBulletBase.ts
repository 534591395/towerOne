/**
 * 魔法弹基类,魔法弹攻击轨迹跟箭不一样，不遵循物理规则，是一种类似AI运行轨迹
 */

class MagicBulletBase extends VectorElements {
    // 是否击中目标
    public isHit: boolean = false;
    // 是否跟踪目标
    public follow: boolean = false;
    /** 触发攻击时候的起始坐标（产生点）*/
    public p: egret.Point;
    // 单一目标
    public target: any;
    public view: egret.MovieClip;

    public constructor() {
        super();
        this.fsm = new StateMachine(this);
    }

    public hittest(): void {
        if (HitTest.hitTestRect(this, this.target)) {
            this.target.hp -= this.damage;
            this.isHit = true;
            this.follow = false;
        }
    }

    public onEnterFrame(timeStamp: number) {
        super.onEnterFrame(timeStamp);
        this.rotation = this.angle;
        this.fsm.onEnterFrame(timeStamp);
    }
}