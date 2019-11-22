/**
 * 技能2 --增援士兵
 */

class Skill2 extends SkillBase {
    /* 生成的增援士兵集合 */
    private soldiers: any[] = [];
    /* 增援士兵种类 */ 
    private soldier1: Reinforcements1;
    private soldier2: Reinforcements2;
    /**士兵集合点偏移量- 跟集合点坐标的偏移，防止士兵扎堆在一个点上，默认塔生成两个士兵 */
    protected offsetArr: number[][] = [[-10,0],[10,10]];
    /**集合点偏移量数组索引*/
    protected offsetIndex: number = -1;

    public constructor() {
        super();
        
        this.skillOffResName = 'uiskill2off';
        this.skillOnResName = 'uiskill2';
        this.cdtime = 20000;
        this.default();
    }
    

    public onEnterFrame(timeStamp: number) {
        super.onEnterFrame(timeStamp);

        // 进入攻击范围的敌人，没有攻击对象的敌人
        let atargets = [];
        GuankaBase.instance.enemyArr.map(item => {
            if (item.target === null) {
                const isIn: boolean = Utiles.containsXY2(item.x,item.y, this.stage.stageWidth, this.stage.stageHeight);
                const index = atargets.indexOf(item);
                if (isIn && item.hp > 0) {
                    if (index === -1) {
                        atargets.push(item);
                    }
                } else {
                    // 已经不在该塔的攻击范围内
                    if (index > -1) {
                        atargets.splice(index, 1);
                    }
                }
            }
        });

        // 下面是赋值给每个
        let soliders = [];
        this.soldiers.map(solider => {
            if (solider.hp > 0) {
                soliders.push(solider);
                solider.targets = atargets;
            }
        });
        this.soldiers = soliders;
    } 

    /**释放技能 */
    public releaseSkills(arr: number[]) {
        super.releaseSkills(arr);
        //利用对象池创建增援士兵
        this.soldier1 = <Reinforcements1>ObjectPool.getInstance().createObject(Reinforcements1);
        this.soldier2 = <Reinforcements2>ObjectPool.getInstance().createObject(Reinforcements2);
        this.soldier1.life = this.soldier2.life = Math.sqrt(GuankaBase.instance.hardxs) * 20;
        this.soldier1.damage = this.soldier2.damage = Math.sqrt(GuankaBase.instance.hardxs) * 4;

        this.parentContentLayer.addChild(this.soldier1);
        this.parentContentLayer.addChild(this.soldier2);
        this.soldiers.push(this.soldier1);
        this.soldiers.push(this.soldier2);
        GuankaBase.instance.objArr.push(this.soldier1);
        GuankaBase.instance.objArr.push(this.soldier2);

        this.soldier1.xoffset = this.offsetArr[0][0];
        this.soldier1.yoffset = this.offsetArr[0][1];
        this.soldier2.xoffset = this.offsetArr[1][0];
        this.soldier2.yoffset = this.offsetArr[1][1];

        const positionArr = [[arr[0],arr[1]],[arr[0],arr[1]]];
        this.soldier1.init(positionArr);
        this.soldier2.init(positionArr);
    }  
}