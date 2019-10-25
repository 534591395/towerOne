/**
 * 盾塔基类--士兵小队
 */

class ShieldTowerBase extends TowerFoundation {
   
    /** 引用场景里放置士兵的数组 具体请看 GuankaBase 类中的objArr 定义*/
    protected objArr: any[];    

    /** 士兵集合点坐标 */
    protected soldierPoint: egret.Point; 
    /** 士兵集合 */
    protected soldiers: ShieldSoldier01[] = [];

    /** 创建士兵的计时器 */
    protected timer: egret.Timer;

    /**士兵集合点偏移量- 跟集合点坐标的偏移，防止士兵扎堆在一个点上，默认塔生成三个士兵 */
    protected offsetArr: number[][] = [[10,0],[0,-10],[-10,0]];
    /**集合点偏移量数组索引*/
    protected offsetIndex: number = -1;

    /** 士兵少于规定的人数时，重新恢复一个士兵的时间 */
    protected createTime: number = 10000;
    /** 时间累计， 跟 createTime 比较，timeSum >= createTime 可重新生成一个损失的士兵 */
    protected timeSum: number = 0;

    // 最多生成的士兵数量
    protected maxSolider: number = 3;
    // 士兵的血量
    protected life: number;
    // 士兵的攻击力
    protected damage: number;
    

    /**音效资源*/
    protected voiceArr: string[] = ["shield_ready1","shield_ready2","shield_ready3"];
    

    public constructor() {
        super();
        //播放音效
        const idx = Math.floor(Math.random() * 3);
        //SoundManager.playEffect(this.voiceArr[idx]);
    }

    public init(): void {
        this.timer = new egret.Timer(1000, this.maxSolider);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.createOneSolider, this);
        this.timer.start();
    }

    /** 生成一个士兵 */
    private createOneSolider(e: egret.TimerEvent) {
        const soldier: ShieldSoldier01 = <ShieldSoldier01>ObjectPool.getInstance().createObject(ShieldSoldier01);
        soldier.life = this.life;
        soldier.damage = this.damage;
        this.parentContentLayer.addChild(soldier);
        this.objArr.push(soldier);
        this.soldiers.push(soldier);
        // 更新索引
        this.updateOffsetIndex();
        soldier.xoffset = this.offsetArr[this.offsetIndex][0];
        soldier.yoffset = this.offsetArr[this.offsetIndex][1];
        soldier.init([[this.sx, this.sy],[this.soldierPoint.x, this.soldierPoint.y]]);
    }

    // 更新索引
    private updateOffsetIndex() {
        this.offsetIndex++;
        if (this.offsetIndex > (this.maxSolider-1)) {
            this.offsetIndex = 0;
        }
    }
}