/**
 * 防御塔的士兵-- 防御塔会派出士兵在路上拦截怪物
 */

class ShieldSoldierBase extends VectorElements {
    // 帧动画
    protected view: egret.MovieClip;
    // 播放帧label
    protected stateLabel: string;

    // 士兵当前攻击目标（怪物）
    public target: any;
    // 进入攻击范围的怪物集合
    public targets: any[] = [];

    // 士兵当前生命值
    protected _hp: number;
    // 总生命值（最大生命值）
    protected life: number;

    // 血条
    protected lifeBar: LifeBar;

    public constructor() {
        super();

        // 申明状态机
        this.fsm = new StateMachine(this);

        // 血条
        this.lifeBar = new LifeBar();
        this.addChild(this.lifeBar);
    }
}