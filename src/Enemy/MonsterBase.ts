/**
 * 怪物基类
 */

class MonsterBase extends VectorElements {
    // 帧动画
    protected view: egret.MovieClip;
    // 播放帧label
    protected stateLabel: string;

    // 怪物攻击间隔时间
    protected fireDelay: number;
    /** 时间戳累计时间，攻击判断需要：timesum >= fireDelay  到了攻击时间 */
    protected timesum: number;
    
    // 血条
    protected lifeBar: LifeBar;
    
    // 该怪物死亡时玩家能获取的金币数
    protected value: number;
    // 怪物是否被杀死标记
    protected beKill: boolean = false;
    /** 怪物是否被攻击 */
    protected beAttack: boolean = false;
    // 怪物攻击目标
    protected target: any;
    /**弓箭瞄向目标向上偏移量(自身头部位置)*/
    public offy: number;

    // 怪物当前生命值
    protected _hp: number;
    // 总生命值（最大生命值）
    protected life: number;
    

    public constructor() {
        super();

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

    // 碰撞检测--怪物跟攻击目标之间
    protected hittest() {
        if (this.target) {
            this.target.hp -= this.damage;
            if (this.target.hp <= 0) {
                this.target.target = null;
                this.target = null;
            }
        }
    }

    /** 销毁： ObjectPool.getInstance().destroyObject 内调用 **/
    public onDestroy():void {
        super.onDestroy();
        if (this.target !== null) {
            this.target.target = null;
            this.target = null;
        }
    }

    // 实时刷新
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
        //this.stateLabel = "walking";
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
    
    // 移动中，状态机里调用
    public moving() {
        // this.angle 在VectorElements里确定
        this.setMoveAngleLabel(this.angle);
        if (this.currentState !== stateType.moveState) {
            this.currentState = stateType.moveState;
            this.view.gotoAndPlay(this.stateLabel);
        }
        //判断目标!=null 则切换到闲置状态 --从移动状态到闲置状态 --
        // 闲置状态-到攻击状态
        if(this.target!=null){
            this.fsm.changeState(stateType.idleState);
        }
        this.checkLast(this.stateLabel, this.view.currentFrame);
    } 

    /**闲置中*/
    public idling(){
        if(!(this.currentState == stateType.idleState)) {
            this.currentState = stateType.idleState;
            this.view.gotoAndStop(this.stateLabel);
        }
        this.moveOrFight();
    }

    /**移动完毕 */
    public movingEnd() {
        if (this.currentState !== stateType.moveEndState) {
            this.currentState = stateType.moveEndState;
            this.canClear = true;
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
        }
        this.checkLastEnd(this.stateLabel);
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


    /**死亡中*/
    protected dieVoiceArr: string[] = ["monster_die1","monster_die2","monster_die3","monster_die4"];
    public dying(){
        if(!(this.currentState == stateType.deadState)) {
            this.currentState = stateType.deadState;
            this.view.gotoAndPlay(this.stateLabel);
            
            //死亡音效
            const idx = Math.floor(Math.random() * 4);
           // SoundManager.playEffect(this.dieVoiceArr[idx]);
        }
        this.checkLastEnd(this.stateLabel);
    }
    /**死亡完毕-可以消除*/
    public dyingEnd(){
        if(!(this.currentState == stateType.deadEndState)) {
            this.currentState = stateType.deadEndState;
            
            this.beKill = true;
            this.canClear = true;
        }
    }

    /** 移动方向判断-- 动画帧lable确定， 通用判断 */
    protected setMoveAngleLabel(angle: number) {
        if(angle >=0 && angle<=60 || angle>=300 && angle<=360){//right
            this.stateLabel = "walking";
            this.view.scaleX = 1;
        }
        else if(angle>60 && angle<120){//down
            this.stateLabel = "walkingDown";
        }
        else if(angle>=120 && angle<=240){//left
            this.stateLabel = "walking";
            this.view.scaleX = -1;
        }
        else if(angle>240 && angle<300){//up
            this.stateLabel = "walkingUp";
        }
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

    /**循环播放检查*/
    private checkLast(str:string, currentFrame: number){
        const nextFrameNum:number = currentFrame+1;
        const movieClipData = this.view.movieClipData;
        const mz: string = this.getFrameLable(movieClipData, nextFrameNum);
        if( mz != str){
            this.view.gotoAndPlay(str);
        }
    }

    /**播放结束检查*/
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

    /**判断目标!=null 且目标距离达到攻击距离时则切换到攻击状态 若目标==null则切换到移动状态*/
    private moveOrFight() {
        if (this.target !== null) {
            if (this.beAttack) {
                this.fsm.changeState(stateType.fightState);
            } else {
                this.fsm.changeState(stateType.idleState);
            }
        } else {
            this.beAttack = false;
            this.fsm.changeState(stateType.moveState);
        }
    }
}