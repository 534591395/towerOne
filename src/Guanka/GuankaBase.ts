/**
 * 关卡基类
 */

class GuankaBase extends eui.Component {
    // 地图位图
    public backgroundImage: eui.Image;
    
    // UI特效层、提示层
    protected uiLayer: egret.DisplayObjectContainer;
    // 地基层
    protected foundationLayer: egret.DisplayObjectContainer;
    /**怪物层、士兵层、英雄层、塔层(层级排序)*/
    public objLayer: egret.DisplayObjectContainer;    
    // 武器层-- 弓箭、炮弹
    public weaponLayer: egret.DisplayObjectContainer;
    // 建造工具层
    protected toolLayer: egret.DisplayObjectContainer;
    
    // 关卡UI对象
    protected guankaUI: GuankaUI;
    // 防御塔建造工具类
    protected tool: BuildTool;


    // 地基坐标集合
    protected foundationPosiotionArr: number[][] = [];


    // 地基实例集合
    protected foundationArr: Foundation[] = [];
    // 塔实例集合
    protected towerArr: any[] = [];
    // 建筑队列--由于建筑异步执行（等待建筑动画执行完毕），故需要一个建筑队列
    protected buildQuene: any[] = [];
    // 敌人(怪物)集合
    protected enemyArr: any[] = [];
    // 怪物层、士兵层、英雄层、塔层的child对象集合
    protected objArr: any[] = []; 

    // 怪物行走路径点数组
    protected roadArr: number[][][] = [];
    // 当前行走路径点
    protected curRoadArr: number[][] = [];

    // 所有波敌人数据 （类型、数量、生命、速度、攻击力、价值）
    protected enemyData: any[] = [];

    // 选中的地基|塔
    protected selectObj:any;

    // 金币数
    protected gold: number;
    // 生命数
    protected life: number;

    // 无尽模式累计轮次 -- 记录最佳通关需要
    protected wujinRoundSum: number;

    // 轮次难度系数基数
    public hardxs: number = 1;
    // 无尽模式难度累加系数
    public perxs: number = 1;

    // 总轮次（怪物进攻波次）
    protected allRound: number;
    // 当前怪物进攻的轮次（波次），因为 0值是有意义的，故默认值为-1
    protected currentRound: number = -1;
    // 当前轮次进攻怪物类别
    protected roundMonsterType: string; 
    // 当前轮次剩余怪物数量
    protected roundMosterLeft: number;
    // 当前轮次敌人生命
    protected roundLife: number = -1;
    // 当前轮次敌人移动速度
    protected roundSpeed: number;
    // 当前轮次敌人攻击力
    protected roundDamage: number;
    // 当前轮次敌人死亡玩家获取的金币
    protected roundValue: number;
    // 轮次进行中
    protected rounding: boolean = false;
    // 到下一轮次的间隔时间
    protected delayToNext: number = 1000;
    // 到下一轮次的时间累计（帧率变动累计），判断是否进入下一轮的判断需要，当 delayToNextSum >= delayToNext 时，表示到了下一轮的时间。
    protected delayToNextSum: number = 0;
    // 怪物产生平均间隔 -- 怪物不是一次是产生的，有间隔（出场间隔）
    protected meanTime: number = 500;
    // 怪物产生时间差（帧率变动累计），用来判断是否可生成怪物 ： otime >= meanTime 时，表示可以产生怪物
    protected otime: number = 0;

    constructor() {
        super();

        // 关于这边层的使用说明：通过层来控制显示顺序，以及显示分类

        // UI特效层、提示层
        this.uiLayer = new egret.DisplayObjectContainer();
        this.addChild(this.uiLayer);

        // 地基层
        this.foundationLayer = new egret.DisplayObjectContainer();
        this.addChild(this.foundationLayer);

        // 怪物层、士兵层、英雄层、塔层(层级排序)
        this.objLayer = new egret.DisplayObjectContainer();
        this.addChild(this.objLayer);

        // 添加武器层
        this.weaponLayer = new egret.DisplayObjectContainer();
        this.addChild(this.weaponLayer);

        // 建造工具层
        this.toolLayer = new egret.DisplayObjectContainer();
        this.addChild(this.toolLayer);
    }

    // 生成UI特效层、提示层
    protected createUI() {
        this.guankaUI = new GuankaUI();
        this.backgroundImage = this.guankaUI.backgroundImage;
        this.backgroundImage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.bgTouch, this);

        this.uiLayer.addChild(this.guankaUI);

        this.uiLayer.addEventListener(MainEvent.QuitGuanka, this.handleBackToWorld, this);
    }

    // 实时刷新，子类中执行
    protected onEnterFrame(timeStamp:number) {
        this.enterFrameTowers(timeStamp);
        // 创建怪物轮次
        this.createEnemies(timeStamp);
    }
    // 刷新塔
    private enterFrameTowers(timeStamp:number) {
        this.towerArr.map(tower => {
            tower.onEnterFrame(timeStamp);
        });
    }

    // 退出关卡，回到事件地图界面
    private handleBackToWorld() {
        this.dispatchEvent(new MainEvent(MainEvent.OpenLoadBar, "maps"));
    }

    private bgTouch(e: egret.TouchEvent) {
        
    }

    // 创建地基，标记可以造箭塔的位置
    protected createFoundation(classFactory:any) {
        this.foundationPosiotionArr.map((item,i) => {
            // 地基
            let foundation = new classFactory();
            foundation.x = item[0];
            foundation.y = item[1];
            foundation.index = i;
            this.foundationLayer.addChild(foundation);
            this.foundationArr.push(foundation);
            foundation.touchEnabled = true;
            // 监听触摸事件
            foundation.addEventListener(egret.TouchEvent.TOUCH_TAP, this.foundationOrTowerTouch, this);
            // 自定义事件
            foundation.addEventListener(TowerEvent.ShowTool, this.showTool, this);
            foundation.addEventListener(TowerEvent.HideTool, this.hideTool, this);
        });
    }
    
    // 创建怪物轮次（一波一波的怪物）
    protected createEnemies(timeStamp) {
        // 若当前轮次在进行中，产生怪物
        if (this.rounding) {
            // 若当前轮次需产生的怪物剩余数量为0，则不再产生怪物
            if (this.roundMosterLeft === 0) {
                return;
            }
            // 累加时间，直到下一个怪物产生平均间隔
            this.otime += timeStamp;
            // 还没达到下一个怪物产生时间
            if (this.otime < this.meanTime) {
                return;
            }
            // 产生了一个怪物，累计时间清零
            this.otime = 0;
            // 添加一个怪物到场景里
            this.addMosters(this.roundMonsterType, this.curRoadArr);
            // 剩余怪物数减掉一个
            this.roundMosterLeft = -1;
        }
        // 重新设置怪物产生条件 
        else {
            // 累加时间，直到下一轮次开始时间
            this.delayToNextSum += timeStamp;
            if (this.delayToNextSum >= this.delayToNext) {
                // 清空时间累计相关字段
                this.delayToNextSum = 0;
                this.otime = 0;
                // 更新当前轮次
                this.currentRound ++;
                // 若当前轮次更新后值小于总轮次，进入下一个轮次
                if (this.currentRound < this.allRound) {
                    // 标记修改：当前有轮次在进行中
                    this.rounding = true;
                    // 怪物数据
                    let monsterData = this.enemyData[this.currentRound];
                    // 当前轮次怪物种类（说明：每轮次出现的怪物种类是相同的）
                    this.roundMonsterType = monsterData["type"];
                    // 剩余怪物数量（即：当前轮次出现的怪物总数）
                    this.roundMosterLeft = monsterData["count"];
                    // 当前轮次每个怪物生命值， 乘以当前关卡的难度系数(控制怪物血量)
                    this.roundLife = monsterData["life"] * this.hardxs;
                    // 当前轮次怪物攻击力， 乘以当前关卡的难度系数(控制怪物攻击力-- 我方防御塔会生成士兵，怪物攻击我方的士兵)
                    this.roundDamage = monsterData["damage"] * this.hardxs;
                    // 怪物死亡后玩家能获取到的金币数
                    this.roundValue = monsterData["value"];

                    // currentRound值+1说明-- currentRound默认从-1开始。我们显示轮次从1开始 
                    if (Main.wujin) {
                        // 
                        this.guankaUI.setRound(this.currentRound + 1 + this.wujinRoundSum, this.currentRound + 1 + this.wujinRoundSum);
                    } else {
                        this.guankaUI.setRound(this.currentRound + 1, this.allRound);
                    }

                    // 播放开始一轮的音效
                    SoundManager.playEffect("bo_start");
                }
            }  
        }
    }

    // 地基\塔被点击
    private foundationOrTowerTouch(e: egret.TouchEvent) { 
        Group.selectItem(e.currentTarget);
    }

    // 显示建造防御塔的选项工具ui
    private showTool(e: TowerEvent) {
        // touchObj: 某个地基、某个防御塔
        const touchObj = e.currentTarget;
          
        this.tool = new BuildTool(touchObj, this.gold);
        /**
         * 公式推导：
         * this.tool的中点坐标移到touchObj的中点坐标， 先求出 touchObj的中点坐标--(touchObj.x + touchObj.width/2)，赋值给this.tool（记为坐标A(Ax, Ay) = (this.tool.x, this.tool.y)），然后求出this.tool的中点坐标记为坐标B(Bx, By) = (Ax+(this.tool.width/2), Ay+(this.tool.height/2)) ；要将中点B移到坐标A，移动距离A'(A'x, A'y) = (Bx-Ax, By-Ay) = (this.tool.width/2, this.tool.height/2);
         * 故最终this.tool的坐标为：( Ax- A'x, Ay- A'y ) 
         */
        this.tool.x = (touchObj.x + touchObj.width/2) - this.tool.width/2;
        this.tool.y = (touchObj.y + touchObj.height/2) - this.tool.height/2;
        this.toolLayer.addChild(this.tool);

        this.tool.addEventListener(ToolEvent.BuildStart, this.buildStart, this);

        this.selectObj = touchObj;
    }

    // 开始建筑---说明：升级塔无需等待
    private buildStart(e: ToolEvent) {
        // 防御塔类别名称
        const towerName = e.className;
        // 新建防御塔
        if (towerName === 'ArrowTower01') {
            // 播放修建动画
            const buildWait = new BuildWait(towerName, this.selectObj.index);
            buildWait.x = this.selectObj.x;
            buildWait.y = this.selectObj.y - 25; 
            this.objLayer.addChild(buildWait);
            buildWait.addEventListener(ToolEvent.BuildComplete, this.buildComplete, this);
            // 扣除建筑费用
            this.gold -= e.price;
            this.guankaUI.setGold(this.gold);
            // 由于建筑异步执行，故需要放入建筑队列
            this.buildQuene.push({
                className: towerName,
                x: this.selectObj.x,
                y: this.selectObj.y,
                towerWidth: this.selectObj.width,
                towerHeight: this.selectObj.height,
                index: this.selectObj.index
            });
        }

        // 移除建筑工具ui
        Group.dispose();
        this.hideTool();

        // 移除上一个选中的塔|地基 -- 查看：this.createFoundation | this.buildTower
        this.selectObj.addEventListener(egret.TouchEvent.TOUCH_TAP, this.foundationOrTowerTouch, this);
        // 排除地基--地基不从舞台上删除（地基重复使用，故无需删除）
        if (egret.getQualifiedSuperclassName(this.selectObj) !== "Foundation") {
            // 删除塔
            this.objLayer.removeChild(this.selectObj);
            let index = this.towerArr.indexOf(this.selectObj);
            if (index > -1) {
                this.towerArr.splice(index, 1);
            }
            this.selectObj.destroy();
        }
        this.selectObj = null;
    }

    // 建筑完成
    private buildComplete(e: ToolEvent) {
        // 从舞台上删除建筑动画
        const waitBuild = e.currentTarget;
        const index = waitBuild.index;
        waitBuild.removeEventListener(ToolEvent.BuildComplete, this.buildComplete, this);
        this.objLayer.removeChild(waitBuild);
        
        // 移除建筑队列
        let arr = [];
        let tower;
        this.buildQuene.map(build => {
            if (build.index === index) {
                tower = build;
            } else {
                arr.push(build);
            }
        });
        
        this.buildQuene = arr;
        if (tower) {
            this.buildTower(tower, tower.className);
        }
    }

    // 创建一个怪物到场景里
    private addMosters(classFactory: string, roadArr: number[][]) {
        const monster = <Monster>ObjectPool.getInstance().createObject(Monster);
        this.objLayer.addChild(monster);
        this.enemyArr.push(monster);
    }

    // 隐藏建造防御塔的选项工具ui
    private hideTool() {
        if (this.tool === null) {
            return;
        }
        this.tool.removeEventListener(ToolEvent.BuildStart, this.buildStart, this);
        this.tool.hide();
        this.tool = null;
    }

    // 创建防御塔
    private buildTower(towerObj, towerName) {
        // 获取防御塔类
        const towerClassName = egret.getDefinitionByName(towerName);
        const tower = new towerClassName();

        tower.x = tower.sx =  towerObj.x;
        tower.y = tower.sy =  towerObj.y - towerObj.towerHeight + 15;
        tower.index = towerObj.index;


        // 防御塔所属基地类
        const foundationClassName = egret.getQualifiedSuperclassName(tower);
        if (foundationClassName === 'ArrowTowerFoundation') {
            // 放置子类的容器为游戏场景的武器层
            tower.parentContentLayer = this.weaponLayer;
        }
        

        this.objLayer.addChild(tower);
        this.towerArr.push(tower); 

        tower.touchEnabled = true;
        tower.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.foundationOrTowerTouch,this);
        tower.addEventListener(TowerEvent.ShowTool,this.showTool,this);
        tower.addEventListener(TowerEvent.HideTool,this.hideTool,this);
    }

    public destroy() {

    }
}