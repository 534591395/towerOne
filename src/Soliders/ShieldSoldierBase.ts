/**
 * 防御塔的士兵-- 防御塔会派出士兵在路上拦截怪物
 */

class ShieldSoldierBase extends VectorElements {
    // 帧动画
    protected view: egret.MovieClip;
    // 播放帧label
    protected stateLabel: string;

    // 士兵攻击间隔时间
    protected fireDelay: number;
    /** 时间戳累计时间，攻击判断需要：timesum >= fireDelay  到了攻击时间 */
    protected timesum: number;

    // 士兵当前攻击目标（怪物）
    public target: any;

    // 进入攻击范围的敌人集合
    public atargets: any[] = [];

    // 士兵当前生命值
    protected _hp: number;
    // 总生命值（最大生命值）
    public life: number;

    /**相对于集结点的偏移量 */
    public xoffset: number = 0;
    public yoffset: number = 0;

    /** 集合点 */
    protected jihePoint: Vector2D;
    /** 该士兵是否在集合点上 */
    protected atJihePoint: boolean = false;
    
    /** 士兵是否移动到敌人坐标 */
    protected moveToTarget: boolean = false;
    

    /**攻击范围最大半径*/
    protected maxSoldRadius: number = 60;
    /**攻击范围最小半径*/
    protected minSoldRadius: number = 40;
    /**将圆沿y轴压扁变为椭圆时候的比例*/
    protected ratioSoldY: number;

    /** 士兵血条 */
    protected lifeBar: LifeBar;

    /**攻击音效数组*/
    protected voiceArr: string[] = ["shield_fire1","shield_fire2","shield_fire3"];

    public constructor() {
        super();
        this.ratioSoldY = this.minSoldRadius / this.maxSoldRadius;
        // 申明状态机
        this.fsm = new StateMachine(this);

        // 血条
        this.lifeBar = new LifeBar();
        this.addChild(this.lifeBar);
    }

    // 更新生命存活状态
    public changeLive() {
        if (this._hp <= 0) {
            this.fsm.changeState(stateType.deadState);
        }
        if (this._hp > this.life) {
            this._hp = this.life;
        }
    }

    // 外部设置当前生命值后，执行
    public set hp(value: number) {
        this._hp = value;
        this.changeLive();
        this.lifeBar.setProgress(this._hp, this.life);
    }

    public get hp(): number {
        return this._hp;
    }

    // 选中
    public selectItem():void {
        this.dispatchEvent(new SoldierEvent(SoldierEvent.Select, this));
    }
    
    // 取消
    public deselectItem():void {
        this.dispatchEvent(new SoldierEvent(SoldierEvent.Deselect, this));
    }
    
    // 重置
    public reselectItem(): void {
       
    }

    // 碰撞检测--跟攻击目标之间
    protected hittest() {
        if (this.target) {
            this.target.hp -= this.damage;
            if (this.target.hp <= 0) {
                // 将被消灭的敌人从敌人集合里移除
                let index = this.targets.indexOf(this.target);
                if (index > -1) {
                    this.targets.splice(index, 1);
                }
                // 将被消灭的敌人从进入攻击范围敌人集合里移除
                index = this.atargets.indexOf(this.target);
                if (index > -1) {
                    this.atargets.splice(index, 1);
                }

                this.target.target = null;
                this.target = null;
            }
        }
    }

    public onDestroy(): void {
        // 该对象从场景里移除
        super.onDestroy();
        if (this.target !== null) {
            this.target.target = null;
            this.target = null;
        }
    }

    public onEnterFrame(advancedTime :number) {
        // 累加时间-用来判断是否到了怪物攻击的时间
        this.timesum += advancedTime;
        // 刷新怪物状态
        this.fsm.onEnterFrame(advancedTime);
        // 移动（向量）
        super.onEnterFrame(advancedTime);
        
        if (this.canClear) {
            ObjectPool.getInstance().destroyObject(this);
        }
    }


    /**闲置 -- 状态机里执行*/
    public isIdle():boolean{
        this.stateLabel = "idle";
        return true;
    }
    /**移动 -- 状态机里执行*/
    public isMove():boolean{
        return true;
    }
    /**攻击 -- 状态机里执行*/
    public isFighting():boolean{
        this.stateLabel = "fighting";
        return true;
    }
    /**死亡 -- 状态机里执行*/
    public isDead():boolean{
        this.stateLabel = "dead";
        return true;
    }


    /**闲置中*/
    public idling(){
        if(!(this.currentState == stateType.idleState)) {
            this.currentState = stateType.idleState;
            this.view.gotoAndStop(this.stateLabel);
        }
        this.moveOrFight();
    }

    // 移动中，状态机里调用
    public moving() {
        // this.angle 在VectorElements里确定
        this.setMoveAngleLabel(this.angle);
        if (this.currentState !== stateType.moveState) {
            this.currentState = stateType.moveState;
            this.view.gotoAndPlay(this.stateLabel);
        }
        //判断目标!=null 则切换到闲置状态 --从移动状态到闲置状态 --
        if(this.target!=null){
            this.fsm.changeState(stateType.idleState);
        }
        // 实时切换状态
        this.checkLast(this.stateLabel, this.view.currentFrame);
    } 

    /**攻击完毕-碰撞检测*/
    public fightingEnd() {
        if(!(this.currentState == stateType.fightEndState)) {
            this.currentState = stateType.fightEndState;
            this.hittest();
            this.timesum = 0;
        }
        //攻击完毕敌人若死亡切换到移动状态
        if(this.target == null) {
            this.fsm.changeState(stateType.moveState);
        } else {
            //循环攻击
            if(this.timesum >= this.fireDelay) {
                //攻击之前检测目标是否活着
                this.moveOrFight();
                this.fsm.changeState(stateType.fightState);
                this.timesum = 0;
            }
        }
    }
    
    /** 士兵死亡中 */
    public dying(){
        if(this.currentState !== stateType.deadState) {
            this.currentState = stateType.deadState;
            this.view.gotoAndPlay(this.stateLabel);
        }
        this.checkLastEnd(this.stateLabel);
    }

    /**死亡完毕-可以消除*/
    public dyingEnd(){
        if(this.currentState !== stateType.deadEndState) {
            this.currentState = stateType.deadEndState;
            this.canClear = true;
        }
    }


    /**移动完毕 */
    public movingEnd() {
        if (this.currentState !== stateType.moveEndState) {
            this.currentState = stateType.moveEndState;
            this.fsm.changeState(stateType.idleState);
        }
    }

    /**攻击中 */
    public fighting() {
        if (this.currentState !== stateType.fightState) {
            this.currentState = stateType.fightState;
            this.view.gotoAndPlay(this.stateLabel);

            // 攻击方向
            if (this.target !== null) {
                // 正方向
                if(this.x <= this.target.x) {
                    this.view.scaleX = 1;
                } else {
                    this.view.scaleX = -1;
                } 
            }
            //播放攻击音效
            const idx = Math.floor(Math.random() * 3);
            //SoundManager.playEffect(this.voiceArr[idx]);
        }
        this.checkLastEnd(this.stateLabel);
    }

    // 根据播放帧序列号获取帧lable
    private getFrameLable(movieClipData: egret.MovieClipData, nextFrame: number) {
        let label = '';
        const labels = movieClipData.labels || [];
        labels.map((item, i) => {
            if (i === labels.length-1) {
                if (nextFrame >= item.frame && nextFrame <= movieClipData.numFrames) {
                    label = item.name;
                }
            } else
            if (labels[i+1]) {
                if (nextFrame >= item.frame && nextFrame < labels[i+1].frame) {
                    label = item.name;
                }
            }
        });
        return label;
    }

    /**循环播放检查，当播放的帧lable跟指定的stateLabel不一致时，播放stateLabel  */
    private checkLast(str:string, currentFrame: number){
        const nextFrameNum:number = currentFrame+1;
        const movieClipData = this.view.movieClipData;
        const mz: string = this.getFrameLable(movieClipData, nextFrameNum);
        if( mz != str){
            this.view.gotoAndPlay(str);
        }
    }

    /**播放结束检查， 结束了再判断接下来该播放哪个帧lable，修改状态 */
    private checkLastEnd(curLabel:string){
        const nextFrameNum:number = this.view.currentFrame+1;
        const movieClipData = this.view.movieClipData;
        const label: string = this.getFrameLable(movieClipData, nextFrameNum);
        if( label != curLabel || this.view.currentFrame>=this.view.totalFrames){
            this.view.stop();
            if(this.currentState == stateType.fightState){
                this.fsm.changeState(stateType.fightEndState);
            }else if(this.currentState == stateType.deadState){
                this.fsm.changeState(stateType.deadEndState);
            }
        }
    }

    /** 移动方向判断-- 动画帧lable确定， 通用判断 */
    protected setMoveAngleLabel(angle: number) {
        if(angle >=0 && angle<=90 || angle>=270 && angle<=360){//right
            this.stateLabel = "running";
            this.view.scaleX = 1;
        }
        else if(angle>90 && angle<270){//left
            this.stateLabel = "running";
            this.view.scaleX = -1;
        }
    }

    /**判断目标!=null 且目标距离达到攻击距离时则切换到攻击状态 若目标==null则切换到移动状态*/
    private moveOrFight() {
        this.setTarget();
        // 若当前士兵指定了攻击目标，让士兵移动到目标点，开始攻击
        if (this.target) {
            // 移动到目标点
            if (!this.moveToTarget) {
                this.moveToTarget = true;
                this.target.beAttack = false;
                this.atJihePoint = false;
                // 设置移动距离
                let tx: number;
                let ty: number;
                // 设置移动的目标点在怪物左右附近
                if (this.target.x < this.x) {
                    tx = this.target.x + 16;
                } else {
                    tx = this.target.x - 16;
                }
                ty = this.target.y + 2;
                this.setPathToMove(new Vector2D(tx, ty));
            } else {
                //士兵已经到目标点，开始攻击
                this.moveToTarget = false;
                this.fsm.changeState(stateType.fightState);
                // 敌人状态改成被攻击，请看怪物类
                this.target.beAttack = true;
            }
        } else {
            // 若可攻击敌人集合为空，士兵回到集合点
            if (this.atargets.length === 0) {
                // 若士兵不在集合点，移动到集合点
                if (!this.atJihePoint) {
                    this.atJihePoint = true;
                    this.setPathToMove(this.jihePoint);
                }
            }
        }
    }

    /** 设置新的路径点，并移动 */
    public setPathToMove(v2d: Vector2D):void {
        this.positionArr = [];
        this.positionArr.push(v2d);
        // 执行状态机，会执行 this.moving
        this.fsm.changeState(stateType.moveState);
    }

    // 互相攻击目标
    private setTarget() {
        this.atargets = [];
        this.targets.map(target => {
            // 判断是否进入攻击范围
            const isIn: boolean = Utiles.containsXY(target.x, target.y, this.x,this.y,this.maxSoldRadius,this.ratioSoldY);
            const index = this.atargets.indexOf(target);
            if (isIn) {
                if (index === -1) {
                    this.atargets.push(target);
                }
            } else {
                // 移除已经离开攻击范围的敌人
                if (index > -1) {
                    this.atargets.splice(index, 1);
                }
            }
        });

        
        if (this.target !== null) {
            return;
        }
        // 互相设置攻击目标
        this.atargets.map(target => {
            if (target.target === null && this.target === null) {
                target.target = this;
                this.target = target;
            }
        });
    }
}