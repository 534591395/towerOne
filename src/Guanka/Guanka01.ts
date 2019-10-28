/**
 * 游戏关卡一
 */

class Guanka01 extends GuankaBase {
    // 怪物行走路径点
    private roadArr1:number[][] = [];
    private roadArr2: number[][] = [];

    public constructor() {
        super();
        console.log("游戏关卡一");

        // 设置地基坐标集合，当前手动设置
        this.foundationPosiotionArr = [[484,266],[436,316],[354,316],[314,266],[354,206],[436,206],[634,316],[394,436],[228,141]];
        // 防御塔士兵的集合点，注意跟上面foundationPosiotionArr 坐标要一一对应
        this.soldierPointArr = [[570,256],[484,361],[304,361],[214,263],[304,141],[484,141],[634,256],[394,371],[284,166]];


        this.roadArr1 = [[812,241],[584,241],[484,141],[304,141],[214,241],[24,241]];
        this.roadArr2 = [[812,263],[584,263],[484,363],[304,363],[214,263],[24,263]];
        this.roadArr.push(this.roadArr1);
        this.roadArr.push(this.roadArr2);
        this.enemyData = [
            {"type":"Monster01","count":10,"life":10,"maxSpeed":0.4,"damage":2,"value":10},
            {"type":"Monster02","count":10,"life":10,"maxSpeed":0.8,"damage":2,"value":10},
            {"type":"Monster03","count":15,"life":15,"maxSpeed":0.4,"damage":4,"value":15},
            {"type":"Monster04","count":15,"life":20,"maxSpeed":0.7,"damage":4,"value":15},
            {"type":"Monster05","count":20,"life":25,"maxSpeed":0.4,"damage":8,"value":20},
            {"type":"Monster06","count":20,"life":30,"maxSpeed":0.4,"damage":8,"value":20},
            {"type":"Boss01","count":2,"life":300,"maxSpeed":0.4,"damage":16,"value":500}
        ];

        this.createUI();

        this.backgroundImage.source = Utiles.createBitmapByName("map0").texture;
        this.makeGrid("map0_json");
         
        this.createFoundation(Foundation01);

        this.default();

        //门
        var bm: egret.Bitmap = Utiles.createBitmapByName("men");
        bm.x = -33;
        bm.y = 106;
        this.weaponLayer.addChild(bm);
    }
    
    // 初始化数据
    public default() {
        this.wujinRoundSum = 0;
        this.currentRound = -1;
        this.roundMosterLeft = -1;
        this.delayToNextSum = 0;
        this.otime = 0;
        this.rounding = false;
        this.hardxs = 1;
        this.gold = 250;
        this.life = 20;
        this.allRound = this.enemyData.length;
        
        this.guankaUI.setGold(this.gold);
        this.guankaUI.setLife(this.life);
        
        // 区分故事（剧情）模式还是无尽模式（说明：故事模式通关后开启无尽模式）
        if( Main.wujin ) {
            this.guankaUI.setRound(0, 0);
        } else {
            this.guankaUI.setRound(0, this.allRound);
        }

        //播放背景音乐
        SoundManager.playBgSound("map0bgSound");
        
        this.time = egret.getTimer();
        // 添加心跳监测, startTick函数的参数，第一个参数即它的回调函数，要求有返回值，如果返回为true将在回调函数执行完成之后立即重绘，为false则不会重绘
        egret.startTick(this.onEnterFrame, this);
    }

    protected onEnterFrame(timeStamp:number):boolean {
        super.onEnterFrame(timeStamp);
        //路径
        if(this.rounding && this.roundMosterLeft>0 && this.otime >= this.meanTime-50) {
            this.curRoadArr = this.roadArr[this.roundMosterLeft % this.roadArr.length];
        }
        return false;
    }

    /**再次尝试*/
    protected tryAgainHandle(e: MainEvent) {
        let i: number;
        //清除所有对象
        while(this.objLayer.numChildren>0){
            this.objLayer.removeChildAt(0);
        }
        //清除工具
        while(this.toolLayer.numChildren>0){
            this.toolLayer.removeChildAt(0);
        }
        //恢复地基侦听
        for(i = 0;i < this.foundationArr.length;i++) {
            this.foundationArr[i].addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.foundationOrTowerTouch,this);
        }
        //数组清零
        this.towerArr = [];
        this.objArr = [];
        this.enemyArr = [];
        this.buildQuene = [];
        //初始化各种数据
        this.default();
    }

    public destroy() {
        super.destroy();
        RES.destroyRes(GuanKa.resourceNameArr[Main.choseNumber]);
    }
}