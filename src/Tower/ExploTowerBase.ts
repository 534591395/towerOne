/**
 * 炮塔基类
 */

class ExploTowerBase extends TowerFoundation {
    /**开火延迟 */
    protected fireDelay: number = 2000;
    /**时间累计，跟fireDelay比较，若timesum>=fireDelay， 可以开火 */
    protected timesum: number = 0;
    /** 当前攻击目标 */
    protected target: any;
    
    /**是否开火 */
    protected isfire: boolean = false;
    /**音效资源*/
    protected voiceArr: string[] = ["explo_ready1","explo_ready2","explo_ready3"];
    
    // 炮塔发送时有动画效果
    public view: egret.MovieClip;
    // 武器攻击力
    protected damage: number;
    /** 武器类名称 */
    protected weaponClassName: string;
    /**炮弹类型 */
    protected weapon:any;

    public constructor() {
        super();
    }

    public playFireVoice() {

    }

    public onEnterFrame(timeStamp:number) {
        // 进入攻击范围的敌人
        this.atargets = [];
        this.targets.map(item => {
            const isIn: boolean = Utiles.containsXY(item.x,item.y,this.sx,this.sy - 22,this.maxRadius,this.ratioY);
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
    }

    // 射击，法师生成的魔法球需要点时间，所以发射前需要处理
    public fire(timeStamp:number) {
        // 若没有敌人进入攻击范围，停止攻击
        if (this.atargets.length === 0) {
            // 减去的 299 阈值，是发射前魔法师生成魔法球的时间
            this.timesum = this.fireDelay - 299;
            return;
        }
        
        // 获取第一个敌人
        this.target = this.atargets[0];

        // 时间累积，设置攻击间隔
        this.timesum += timeStamp;
        // 攻击间隔时间未到
        if (this.timesum < this.fireDelay) {
            // 生成魔法球判断
            if ((this.fireDelay - this.timesum) < 300 && !this.isfire) {
                this.view.gotoAndPlay("shoot");
                this.isfire = true;
            }
            return;
        }
        this.timesum = 0;
        this.isfire = false;

        // 播放射击音效
        //this.playFireVoice();

        // 魔法球生成的坐标
        let p: egret.Point = new egret.Point(this.sx,this.sy - 46);

        //利用对象池产生弓箭对象并进行碰撞检测
        const className = egret.getDefinitionByName(this.weaponClassName);
        if (className) {
            this.weapon = ObjectPool.getInstance().createObject(className);
            this.weapon.damage = this.damage;
            this.weapon.init(p,this.target,this.target.offy);
            this.parentContentLayer.addChild(this.weapon);
        }
    }
}