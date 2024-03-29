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
    protected soldierLife: number;
    // 士兵的攻击力
    protected soldierDamage: number;
    

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
        soldier.life = this.soldierLife;
        soldier.damage = this.soldierDamage;
        this.parentContentLayer.addChild(soldier);
        this.objArr.push(soldier);
        this.soldiers.push(soldier);
        // 更新索引
        this.updateOffsetIndex();
        soldier.xoffset = this.offsetArr[this.offsetIndex][0];
        soldier.yoffset = this.offsetArr[this.offsetIndex][1];
        soldier.init([[this.sx, this.sy],[this.soldierPoint.x, this.soldierPoint.y]]);

        // 添加自定义事件监听: SoldierEvent.Select, SoldierEvent.Deselect， 这两个事件触发请查看 GuankaBase的 bgTouch方法。SoldEvent.Move事件触发请查看 ShieldTower01的 setJihePointEvent方法，该方法也是在 bgTouch方法内调用
        soldier.addEventListener(SoldierEvent.Select, this.selectAll, this);
        soldier.addEventListener(SoldierEvent.Deselect, this.deselectAll, this);
        soldier.addEventListener(SoldierEvent.Move, this.moveAll, this);
    }

    /** 选择该塔的所有士兵 */
    private selectAll() {
        this.soldiers.map(soldier => {
            // 取消触摸事件
            soldier.select();
        });
    }

    /** 取消选中该塔的所有士兵 */
    private deselectAll() {
        this.soldiers.map(soldier => {
            // 启动触摸事件
            soldier.deselect();
        });
    }

    /** 移动该塔的所有士兵 */
    private moveAll(e: SoldierEvent) {
        // 新的坐标集
        const arr = e.arr || [];
        // 超出移动范围，士兵有最大移动范围（即所在塔的攻击范围），不能移动
        const isin: boolean = Utiles.containsXY(arr[0],arr[1],this.sx,this.sy-22,this.maxRadius,this.ratioY);
        if (!isin) {
            return;
        }
        //新的集结点
        this.soldierPoint = new egret.Point(arr[0],arr[1]+8);
        // 移动士兵
        this.soldiers.map(soldier => {
            // 设置新的移动点
            soldier.setJihePointToMove([this.soldierPoint.x, this.soldierPoint.y]);
        });
    }

    // 更新索引
    private updateOffsetIndex() {
        this.offsetIndex++;
        if (this.offsetIndex > (this.maxSolider-1)) {
            this.offsetIndex = 0;
        }
    }

    public onEnterFrame(timeStamp: number) {
        super.onEnterFrame(timeStamp);
        // 设置进入攻击范围的敌人集合
        this.atargets = [];
        this.targets.map(target => {
            // 判断是否进入攻击范围
            const isIn: boolean = Utiles.containsXY(target.x, target.y, this.sx, this.sy-22, this.maxRadius,this.ratioY);
            const index = this.atargets.indexOf(target);
            // 进入攻击范围的敌人且敌人活着
            if (isIn && target.hp > 0) {
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

        // 士兵数量少于规定的最大数（死亡后重新生成）
        if (this.soldiers.length < this.maxSolider) {
            this.timeSum += timeStamp;
            if (this.timeSum >= this.createTime) {
                this.createOneSolider(null);
                this.timeSum = 0;
            }
        }

        let tumpArr = [];

        this.soldiers.map(soldier => {
            if (soldier.hp <= 0) {
                soldier.removeEventListener(SoldierEvent.Select, this.selectAll, this);
                soldier.removeEventListener(SoldierEvent.Deselect, this.deselectAll, this);
                soldier.removeEventListener(SoldierEvent.Move, this.moveAll, this);
            } else {
                tumpArr.push(soldier);
                // 更新士兵的敌人集合，值为当前塔的进入攻击范围的敌人集合
                soldier.targets = this.atargets;
            }
        });
        this.soldiers = tumpArr;
    }

    public destroy(): void {
        if (this.timer !== null) {
            this.timer.removeEventListener(egret.TimerEvent.TIMER, this.createOneSolider, this);
            this.timer.stop();
            this.timer = null;
        }
        this.soldiers.map(soldier => {
            soldier.removeEventListener(SoldierEvent.Select, this.selectAll, this);
            soldier.removeEventListener(SoldierEvent.Deselect, this.deselectAll, this);
            soldier.removeEventListener(SoldierEvent.Move, this.moveAll, this);
            soldier.canClear = true;
        });
        this.soldiers = [];
        this.atargets = [];
    }
}