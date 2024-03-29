/**
 * 关卡基类
 */
class GuankaBase extends eui.Component {
    public static instance: GuankaBase;
    // 地图位图
    public backgroundImage: eui.Image;
    /**节点边长*/
    protected cellSize: number;
    /**节点网格*/
    protected grid: Grid;


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
    /** 防御塔的士兵集合点坐标集，取值的时候跟地基对应 */
    protected soldierPointArr: number[][];

    // 地基实例集合
    protected foundationArr: Foundation[] = [];
    // 塔实例集合
    protected towerArr: any[] = [];
    // 建筑队列--由于建筑异步执行（等待建筑动画执行完毕），故需要一个建筑队列
    protected buildQuene: any[] = [];
    // 敌人(怪物)集合
    public enemyArr: any[] = [];
    // 怪物层、士兵层、英雄层、塔层的child对象集合， 显示排序需要（比如塔的显示序列）
    public objArr: any[] = []; 

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
    /** 当前轮次剩余怪物数量 */
    protected roundMosterLeft: number;
    // 当前轮次敌人生命
    protected roundLife: number = -1;
    // 当前轮次敌人移动速度
    protected roundSpeed: number;
    // 当前轮次敌人攻击力
    protected roundDamage: number;
    // 当前轮次敌人死亡玩家获取的金币
    protected roundValue: number;
    /** 轮次进行中 */
    protected rounding: boolean = false;
    // 到下一轮次的间隔时间
    protected delayToNext: number = 1000;
    /** 到下一轮次的时间累计（帧率变动累计），判断是否进入下一轮的判断需要，当 delayToNextSum >= delayToNext 时，表示到了下一轮的时间。*/
    protected delayToNextSum: number = 0;
    /** 怪物产生平均间隔 -- 怪物不是一次是产生的，有间隔（出场间隔）*/
    protected meanTime: number = 500;
    /** 怪物产生时间差（帧率变动累计），用来判断是否可生成怪物 ： otime >= meanTime 时，表示可以产生怪物 */
    protected otime: number = 0;
    protected time:number = 0;

    constructor() {
        super();
        GuankaBase.instance = this;
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
    protected onEnterFrame(timeStamp:number):boolean {
        const now = timeStamp;
        const time = this.time;
        const pass = now - time;
        this.time = now;
        //判断敌人是否死亡或逃脱，更新敌人数组
        this.removeEnemies();
        // 创建怪物轮次
        this.createEnemies(pass);
        this.enterFrameTowers(pass);
        // 关卡ui刷新--玩家技能cd
        this.guankaUI.onEnterFrame(pass);

        //实时刷新排序数组(根据y轴改变对象层级) ?
        this.objArr = Utiles.sortarr(this.objArr);
        for(var i = 0;i < this.objArr.length;i++) {
            var obj = this.objArr[i];
            if(this.objLayer.contains(obj))
            this.objLayer.setChildIndex(obj,i);
        }
        
        return false;
    }
    // 刷新塔
    private enterFrameTowers(timeStamp:number) {
        this.towerArr.map(tower => {
            tower.onEnterFrame(timeStamp);
        });
    }

    /**回收敌人*/
    protected removeEnemies() {
        let i: number;
        for(i = 0;i < this.enemyArr.length;i++) {
            let tar = this.enemyArr[i];
            if(tar.canClear) {
                this.enemyArr.splice(i,1);
                //如果属于被杀死则增加金币、否则则减掉本方剩余生命
                if(tar.beKill) {
                    this.gold += tar.value;
                    this.guankaUI.setGold(this.gold);
                } else {
                    this.life -= 1;
                    this.guankaUI.setLife(this.life);
                    //如果life == 0 则游戏结束
                    if(this.life == 0)
                        this.lose();
                }                                           
                //波数量为0时表示当前波完成
                if(this.rounding && this.enemyArr.length == 0) {
                    //最后一波
                    if(this.currentRound == this.allRound - 1) {
                        //判断无尽模式
                        if(Main.wujin){
                            this.currentRound = -1;
                            this.wujinRoundSum += this.allRound;
                            this.hardxs += this.perxs;
                            this.rounding = false;
                        }else{
                            //胜利
                            if(this.life > 0)
                                this.victory();
                        }
                    } else {
                        //每波难度
                        this.rounding = false;
                    }
                }
            }
        }
        for(i = 0;i < this.objArr.length;i++) {
            var tar = this.objArr[i];
            if(tar.canClear) {
                this.objArr.splice(i,1);
            }
        }
    }

    // 退出关卡，回到事件地图界面
    private handleBackToWorld() {
        this.dispatchEvent(new MainEvent(MainEvent.OpenLoadBar, "maps"));
    }
    
    /** 点击背景图片 */
    private bgTouch(e: egret.TouchEvent) {
        // 获取当前已经选择的对象，若无对象不用做操作，这些对象指的是: 塔、士兵
        const select = Group.selectedItem;
        if (select === null) {
            return;
        }
        const selectParentClassName = egret.getQualifiedSuperclassName(select);
        // 建筑基类
        const arr1 = ["Foundation", "ArrowTowerFoundation", "ShieldTowerBase", "MagicTowerBase", "ExploTowerBase"];
        // 士兵基类
        const arr2 = ["ShieldSoldierBase", "SkillBase"];
         // 若满足下面条件，说明可能展开了建筑建造的工具ui，隐藏工具
        if (arr1.indexOf(selectParentClassName) > -1) {
            this.hideTool();
        }
        // 选择了士兵或者技能
        if (arr2.indexOf(selectParentClassName) > -1) {
            // 取消士兵的选中状态，方法定义在 ShieldSoldierBase.ts
            select.deselectItem();
            // 获取当前手指点击的坐标
            const px = Math.round(e.localX);
            const py = Math.round(e.localY);
            // 可通行
            if (this.checkPoint(px, py)) {
                // 释放技能
                if (selectParentClassName === 'SkillBase') {
                    select.releaseSkills([px, py]);
                } else {
                    select.setJihePointEvent([px, py]);
                }
            }
        }

        // 清除选择项
        Group.dispose();
    }

    /**地图网格，参考第三方代码 */
    protected makeGrid(path:string): void {
        //解析地图json
        const str = RES.getRes(path);
        let i: number;
        let j: number;
        const col: number = str.MapData.length;//列数
        const row: number = str.MapData[0].length;//行数
        this.cellSize = str.TileWidth;//边长
        this.grid = new Grid(col,row);
        for(i = 0;i < col;i++){
            for(j = 0;j < row;j++){
                if(str.MapData[i][j].val == 1) {
                    this.grid.setWalkable(i,j,false);
                }
            }
        }
    }

    /**检查点击网格是否可通过，参考第三方代码*/
    protected checkPoint(xnum:number,ynum:number):boolean{
        var xpos: number = Math.floor(xnum / this.cellSize);
        var ypos: number = Math.floor(ynum / this.cellSize);
        var endNp: NodePoint = this.grid.getNode(xpos,ypos);
        if(endNp.walkable == false) {
            return false;
        } else {
            return true;
        }
    }

    /**再次尝试*/
    protected tryAgainHandle(e: MainEvent) {}
    
    /**关卡胜利*/
    protected victory() {
        this.clear();
       // this.guankaUI.showVictory();
        //更新关卡通关数据、塔升级数据
        //StorageSetting.setGuankaPass(Main.curIdx);
        //StorageSetting.setTowerUpgrade(Main.curIdx);
    }
            
    /**关卡失败*/
    protected lose() {
        this.clear();
       // this.guankaUI.showLose();
        //更新关卡数据
        //if(Main.wujin){
            //StorageSetting.setGuankaWujin(Main.curIdx,this.boSum+this.curBo);
        //}
    }

    /**清除*/
    public clear() {
        //停止背景音乐
        SoundManager.stopBgSound();
        //暂停心跳控制器
        egret.stopTick(this.onEnterFrame, this);
        //清空对象池
        ObjectPool.getInstance().destroyAllObject();
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
    protected createEnemies(pass) {

        // 若当前轮次在进行中，产生怪物
        if (this.rounding) {
            // 若当前轮次需产生的怪物剩余数量为0，则不再产生怪物
            if (this.roundMosterLeft === 0) {
                return;
            }
            // 累加时间，直到下一个怪物产生平均间隔
            this.otime += pass;

            // 还没达到下一个怪物产生时间
            if (this.otime < this.meanTime) {
                return;
            }
            // 产生了一个怪物，累计时间清零
            this.otime = 0;
            // 添加一个怪物到场景里
            this.addMosters(this.roundMonsterType, this.curRoadArr);
            // 剩余怪物数减掉一个
            this.roundMosterLeft -= 1;

        }
        // 重新设置怪物产生条件 
        else {
            // 累加时间，直到下一轮次开始时间
            this.delayToNextSum += pass;
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
                    // 攻击速度
                    this.roundSpeed = monsterData["maxSpeed"];

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
    protected foundationOrTowerTouch(e: egret.TouchEvent) { 
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
        // 监听点击工具图标
        this.tool.addEventListener(ToolEvent.BuildStart, this.buildStart, this);

        this.selectObj = touchObj;
    }

    // 开始建筑---说明：升级塔无需等待, 点击建筑工具的icon触发该方法
    private buildStart(e: ToolEvent) {
        // 防御塔类别名称
        const towerName = e.className;
        // 新建一级防御塔，需要添加建造等待动画
        if (['ArrowTower01', 'ShieldTower01', "MagicTower01", "ExploTower01"].indexOf(towerName) > -1) {
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
        } else 
        // 卖出-- 塔价钱的一半（折价）
        if (towerName === "SellTower") {
            this.gold += Math.round(TowerLevel.data[egret.getQualifiedClassName(this.selectObj)].price / 2);
            this.guankaUI.setGold(this.gold);

            // 恢复监听
            this.foundationArr[this.selectObj.index].addEventListener(egret.TouchEvent.TOUCH_TAP, this.foundationOrTowerTouch, this);
            //卖掉音效
            //SoundManager.playEffect("sell_tower");
        } 
        else {
            // 升级建筑
            // 此时 this.selectObj 指向当前需升级的塔。
            this.buildTower(this.selectObj, towerName);
            // 扣除金币
            this.gold -= e.price;
            // 更新
            this.guankaUI.setGold(this.gold);
        }

        // 移除建筑工具ui
        Group.dispose();
        this.hideTool();

        // 移除上一个选中的塔|地基 -- 查看：this.createFoundation | this.buildTower
        this.selectObj.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.foundationOrTowerTouch, this);
        // 排除地基--地基不从舞台上删除（地基重复使用，故无需删除）
        if (egret.getQualifiedSuperclassName(this.selectObj) !== "Foundation") {
            // 删除塔
            this.objLayer.removeChild(this.selectObj);
            let index = this.towerArr.indexOf(this.selectObj);
            if (index > -1) {
                this.towerArr.splice(index, 1);
            }
            index = this.objArr.indexOf(this.selectObj);
            if (index > -1) {
                this.objArr.splice(index, 1);
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
        monster.addTexture(classFactory);
        monster.init(roadArr,this.roundMosterLeft,this.roundSpeed,this.roundDamage,this.roundValue);
        this.objLayer.addChild(monster);
        this.enemyArr.push(monster);
        this.objArr.push(monster);
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
        if (towerObj.towerHeight) {
            tower.y = tower.sy =  towerObj.y - towerObj.towerHeight + 15;
        } else {
            tower.y = tower.sy =  towerObj.y;
        }
        
        tower.index = towerObj.index;
        tower.targets = this.enemyArr;


        // 防御塔所属基地类
        const foundationParentClassName = egret.getQualifiedSuperclassName(tower);
        if (['ArrowTowerFoundation', 'MagicTowerBase', 'ExploTowerBase'].indexOf(foundationParentClassName) > -1) {
            // 放置子类的容器为游戏场景的武器层
            tower.parentContentLayer = this.weaponLayer;
        } else
        // 选择的塔是防御塔-生成士兵的塔
        if (foundationParentClassName === 'ShieldTowerBase') {
            tower.objArr = this.objArr;
            tower.parentContentLayer = this.objLayer;
            let pointArr: number[] = this.soldierPointArr[tower.index];
            // 设置士兵的集合点
            tower.soldierPoint = new egret.Point(pointArr[0], pointArr[1]);
        }
        

        this.objLayer.addChild(tower);
        this.towerArr.push(tower); 
        this.objArr.push(tower);

        tower.touchEnabled = true;
        tower.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.foundationOrTowerTouch,this);
        tower.addEventListener(TowerEvent.ShowTool,this.showTool,this);
        tower.addEventListener(TowerEvent.HideTool,this.hideTool,this);
        tower.init();
    }

    public destroy() {
        ObjectPool.getInstance()._pool = {};
    }
}