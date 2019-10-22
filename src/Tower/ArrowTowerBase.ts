/**
 * 箭塔基类-箭塔的地基
 */

class ArrowTowerFoundation extends TowerFoundation {
    /** 射击方向 */
    protected direct: string;
    /** 先左边攻击还是先右边攻击 */
    protected firststrike: string = "R";
    // 单一目标
    protected target: any;
    /**开火延迟*/
    protected fireDelay: number = 1000;
    /**时间累计*/
    protected timesum: number = 0;
    /**音效资源*/
    protected voiceArr: string[] = ["arrow_ready1","arrow_ready2","arrow_ready3"];

    public constructor() {
        super();
        //播放音效
        var idx = Math.floor(Math.random() * 3);
       // SoundManager.playEffect(this.voiceArr[idx]);
    }

	/**播放射击音效*/
	protected playFireVoice(){
        if(Math.random() > 0.5) {
            SoundManager.playEffect("arrow_fire1");
        } else {
            SoundManager.playEffect("arrow_fire2");
        }
	}

    // 帧率执行回调方法
    public onEnterFrame(timeStamp:number) {
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