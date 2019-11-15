/**
 * 技能1- 火球
 */

class Skill1 extends SkillBase {
    private xpos: number;
    private ypos: number;
    private timer: egret.Timer;

    public constructor() {
        super();
        
        this.skillOffResName = 'uiskill1off';
        this.skillOnResName = 'uiskill1';
        this.cdtime = 25000;
        this.default();
    }

    /**释放技能 */
    public releaseSkills(arr: number[]) {
        super.releaseSkills(arr);
        this.xpos = arr[0];
        this.ypos = arr[1] + 20;
        this.timer = new egret.Timer(100,10);
        this.timer.addEventListener(egret.TimerEvent.TIMER,this.timerHandle,this);
        this.timer.start();
    }

    private timerHandle(e:egret.TimerEvent) {
        const fireBall: FireBall = <FireBall>ObjectPool.getInstance().createObject(FireBall);
        fireBall.damage = Math.sqrt(GuankaBase.instance.hardxs) * 20;
        if(this.timer.currentCount <= 4) {
            var xnum = 25 - Math.random() * 50 + this.xpos;
            var ynum = 25 - Math.random() * 50 + this.ypos;
        } else {
            var xnum = 50 + Math.random() * (this.stage.stageWidth-100);
            var ynum = 50 + Math.random() * (this.stage.stageHeight-100);
        }
        fireBall.init(xnum, ynum);
        fireBall.targets = GuankaBase.instance.enemyArr;
        GuankaBase.instance.weaponLayer.addChild(fireBall);
    }
}