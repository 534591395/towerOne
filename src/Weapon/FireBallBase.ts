/**
 * 技能：火球基类
 */
class FireBallBase extends VectorElements {
    protected view: egret.MovieClip;
    /**攻击范围最大半径*/
    protected maxSoldRadius: number = 40;
    /**攻击范围最小半径*/
    protected minSoldRadius: number = 30;
    /**将圆沿y轴压扁变为椭圆时候的比例*/
    protected ratioSoldY: number;
    private atargets: any[];
    /** 触发攻击时候的起始坐标（产生点）*/
    public p: egret.Point;
    /**是否击中目标*/
    public isHit: boolean = false;
    /**是否运行过程中*/
    public isTravel: boolean = false;

    constructor() {
        super();

        this.fsm = new StateMachine(this);
    }

    public onEnterFrame(timeStamp:number) {
        super.onEnterFrame(timeStamp);
        this.fsm.onEnterFrame(timeStamp);

        // 一开始就播放运行动画，火球是发射出去了
        if (this.isTravel) {
            this.view.gotoAndPlay("travel");
            this.isTravel = false;
        }
        // 若当前动画label是运行结束，重新开始播放运行中
        if (this.view.currentLabel === "travelEnd") {
            this.view.gotoAndPlay("travel");
        }
        // 击中敌人后，播放击中动画
        if (this.isHit) {
            this.view.gotoAndPlay("hit");
            this.isHit = false;
        }
        // 若当前动画label是击中敌人结束，表示当前魔法弹可以销毁
        if (this.view.currentLabel === "hitEnd") {
            this.canClear = true;
        }

        if (this.canClear) {
            ObjectPool.getInstance().destroyObject(this);
        }
    }

    public setPositionArr(): void {
        this.pathIndex = 0;
        this.positionArr = [];
        // 魔法弹的攻击路径向量点
        const v2d:Vector2D = new Vector2D(this.p.x, this.p.y);
        this.positionArr.push(v2d);
        this.fsm.changeState(stateType.moveState);
    }

    public hittest(): void {
        let disx: number = this.x - this.p.x < 0 ? this.p.x - this.x : this.x - this.p.x;
        let disy: number = this.y - this.p.y< 0 ? this.p.y - this.y : this.y - this.p.y;
        //精确到1个像素内
        if(disx <= 1 && disy <= 1) {
            // 进入攻击范围的敌人
            this.atargets = [];
            this.targets.map(item => {
                const isIn: boolean = Utiles.containsXY(item.x,item.y,this.x,this.x,this.maxSoldRadius,this.ratioSoldY);
                const index = this.atargets.indexOf(item);
                if (isIn && item.hp > 0) {
                    if (index === -1) {
                        this.atargets.push(item);
                    }
                } else {
                    // 已经不在该塔的攻击范围内
                    if (index > -1) {
                        this.atargets.splice(index, 1);
                    }
                }
            });
            this.atargets.map(item => {
                item.hp -= this.damage;
            });
            this.isHit = true;

            //
            //SoundManager.playEffect("explo_fireend1");
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

    /** 移动中，状态机里调用 */
    public moving() {
        if (this.currentState !== stateType.moveState) {
            this.currentState = stateType.moveState;
        }
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