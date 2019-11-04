/**
 * 魔法塔-基类
 */

class MagicTowerBase extends TowerFoundation {
    /**开火延迟 */
    protected fireDelay: number = 1000;
    /**时间累计，跟fireDelay比较，若timesum>=fireDelay， 可以开火 */
    protected timesum: number = 0;
    /**射击方向 */
    protected direct: string;
    /** 当前攻击目标 */
    protected target: any;
    
    /**是否开火 */
    protected isfire: boolean = false;
    /**音效资源*/
    protected voiceArr: string[] = ["magic_ready1","magic_ready2","magic_ready3"];

    public constructor() {
        super();
    }

    public playFireVoice() {

    }

    public onEnterFrame() {
        // 进入攻击范围的敌人，没有攻击对象的敌人
        this.atargets = [];
        this.targets.map(item => {
            if (item.target === null) {
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
            }
        });
        //排序、敌人的攻击对象不为null时则排到末尾
        this.targets.map(item => {
            if (item.target !== null) {
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
            }
        });
    }
}