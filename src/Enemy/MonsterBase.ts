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
    // 时间戳累计时间，攻击判断需要：timesum >= fireDelay  到了攻击时间
    protected timesum: number;
    
    // 血条
    protected lifeBar: LifeBar;
    
    // 该怪物死亡时玩家能获取的金币数
    protected value: number;
    // 怪物是否被杀死标记
    protected beKill: boolean = false;
    // 怪物是否被攻击
    protected beAttack: boolean = false;
    // 怪物攻击目标
    protected target: any;

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
}