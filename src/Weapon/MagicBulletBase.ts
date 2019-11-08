/**
 * 魔法弹基类,魔法弹攻击轨迹跟箭不一样，不遵循物理规则，是一种类似AI运行轨迹
 */

class MagicBulletBase extends VectorElements {
    // 是否击中目标
    public isHit: boolean = false;
    // 是否失去目标
    public isMiss: boolean = false;
    // 是否跟踪目标
    public follow: boolean = false;
    /**第一次触发运行动画的标记 */
    public isTravel: boolean = false;
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
            if(this.target.hp<=-this.damage) {
                this.isMiss = true;//插地效果
                this.rotation = 270;
                //x,y坐标随机偏移几像素
                let dx: number = 2 - Math.random() * 4;
                let dy: number = Math.random() * 6+4;
                this.x += dx;
                this.y += dy;
            } else {
                this.isHit = true;
            }
            //this.isHit = true;
            this.follow = false;
        }
    }

    public setPositionArr(): void {
        this.pathIndex = 0;
        this.positionArr = [];
        // 魔法弹的攻击路径向量点
        const v2d:Vector2D = new Vector2D(this.target.x, this.target.y - this.target.offy);
        this.positionArr.push(v2d);
        this.fsm.changeState(stateType.moveState);
    }

    public onEnterFrame(timeStamp: number) {
        super.onEnterFrame(timeStamp);
        this.rotation = this.angle;
        this.fsm.onEnterFrame(timeStamp);
        // 一开始就播放运行动画，毕竟魔法弹是发射出去了
        if (this.isTravel) {
            this.view.gotoAndPlay("travel");
            this.isTravel = false;
        }
        // 若当前动画label是运行结束，重新开始播放运行中
        if (this.view.currentLabel === "travelEnd") {
            this.view.gotoAndPlay("travel");
        }
        // 击中敌人后，播放击中动画
        if (this.isHit|| this.isMiss) {
            this.view.gotoAndPlay("hit");
            this.isHit = false;
            this.isMiss = false;
        }
        // 若当前动画label是击中敌人结束，表示当前魔法弹可以销毁
        if (this.view.currentLabel === "hitEnd") {
            this.canClear = true;
        }
        //销毁
        if(this.canClear) {
            ObjectPool.getInstance().destroyObject(this);
        }
    }


    /**移动完毕，触发碰撞检测 */
    public movingEnd() {
        if (this.currentState !== stateType.moveEndState) {
            this.currentState = stateType.moveEndState;
            this.fsm.changeState(stateType.idleState);
            this.hittest();
        }
    }

    /** 移动中，状态机里调用，同时随着敌人走动实时调整攻击路径 */
    public moving() {
        if (this.currentState !== stateType.moveState) {
            this.currentState = stateType.moveState;
        }
        // 敌人是实时走动的，故需要更新路径
        this.setPositionArr();
    }

    /**闲置中 */
    public idling() {
        if (this.currentState !== stateType.idleState) {
            this.currentState = stateType.idleState;
        }
    }

    /**闲置 -- 状态机里执行*/
    public isIdle():boolean{
        return true;
    }
    /**移动 -- 状态机里执行*/
    public isMove():boolean{
        return true;
    }
}