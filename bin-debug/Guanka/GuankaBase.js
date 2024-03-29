var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * 关卡基类
 */
var GuankaBase = (function (_super) {
    __extends(GuankaBase, _super);
    function GuankaBase() {
        var _this = _super.call(this) || this;
        // 地基坐标集合
        _this.foundationPosiotionArr = [];
        // 地基实例集合
        _this.foundationArr = [];
        // 塔实例集合
        _this.towerArr = [];
        // 建筑队列--由于建筑异步执行（等待建筑动画执行完毕），故需要一个建筑队列
        _this.buildQuene = [];
        // 敌人(怪物)集合
        _this.enemyArr = [];
        // 怪物层、士兵层、英雄层、塔层的child对象集合， 显示排序需要（比如塔的显示序列）
        _this.objArr = [];
        // 怪物行走路径点数组
        _this.roadArr = [];
        // 当前行走路径点
        _this.curRoadArr = [];
        // 所有波敌人数据 （类型、数量、生命、速度、攻击力、价值）
        _this.enemyData = [];
        // 轮次难度系数基数
        _this.hardxs = 1;
        // 无尽模式难度累加系数
        _this.perxs = 1;
        // 当前怪物进攻的轮次（波次），因为 0值是有意义的，故默认值为-1
        _this.currentRound = -1;
        // 当前轮次敌人生命
        _this.roundLife = -1;
        /** 轮次进行中 */
        _this.rounding = false;
        // 到下一轮次的间隔时间
        _this.delayToNext = 1000;
        /** 到下一轮次的时间累计（帧率变动累计），判断是否进入下一轮的判断需要，当 delayToNextSum >= delayToNext 时，表示到了下一轮的时间。*/
        _this.delayToNextSum = 0;
        /** 怪物产生平均间隔 -- 怪物不是一次是产生的，有间隔（出场间隔）*/
        _this.meanTime = 500;
        /** 怪物产生时间差（帧率变动累计），用来判断是否可生成怪物 ： otime >= meanTime 时，表示可以产生怪物 */
        _this.otime = 0;
        _this.time = 0;
        GuankaBase.instance = _this;
        // 关于这边层的使用说明：通过层来控制显示顺序，以及显示分类
        // UI特效层、提示层
        _this.uiLayer = new egret.DisplayObjectContainer();
        _this.addChild(_this.uiLayer);
        // 地基层
        _this.foundationLayer = new egret.DisplayObjectContainer();
        _this.addChild(_this.foundationLayer);
        // 怪物层、士兵层、英雄层、塔层(层级排序)
        _this.objLayer = new egret.DisplayObjectContainer();
        _this.addChild(_this.objLayer);
        // 添加武器层
        _this.weaponLayer = new egret.DisplayObjectContainer();
        _this.addChild(_this.weaponLayer);
        // 建造工具层
        _this.toolLayer = new egret.DisplayObjectContainer();
        _this.addChild(_this.toolLayer);
        return _this;
    }
    // 生成UI特效层、提示层
    GuankaBase.prototype.createUI = function () {
        this.guankaUI = new GuankaUI();
        this.backgroundImage = this.guankaUI.backgroundImage;
        this.backgroundImage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.bgTouch, this);
        this.uiLayer.addChild(this.guankaUI);
        this.uiLayer.addEventListener(MainEvent.QuitGuanka, this.handleBackToWorld, this);
    };
    // 实时刷新，子类中执行
    GuankaBase.prototype.onEnterFrame = function (timeStamp) {
        var now = timeStamp;
        var time = this.time;
        var pass = now - time;
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
        for (var i = 0; i < this.objArr.length; i++) {
            var obj = this.objArr[i];
            if (this.objLayer.contains(obj))
                this.objLayer.setChildIndex(obj, i);
        }
        return false;
    };
    // 刷新塔
    GuankaBase.prototype.enterFrameTowers = function (timeStamp) {
        this.towerArr.map(function (tower) {
            tower.onEnterFrame(timeStamp);
        });
    };
    /**回收敌人*/
    GuankaBase.prototype.removeEnemies = function () {
        var i;
        for (i = 0; i < this.enemyArr.length; i++) {
            var tar_1 = this.enemyArr[i];
            if (tar_1.canClear) {
                this.enemyArr.splice(i, 1);
                //如果属于被杀死则增加金币、否则则减掉本方剩余生命
                if (tar_1.beKill) {
                    this.gold += tar_1.value;
                    this.guankaUI.setGold(this.gold);
                }
                else {
                    this.life -= 1;
                    this.guankaUI.setLife(this.life);
                    //如果life == 0 则游戏结束
                    if (this.life == 0)
                        this.lose();
                }
                //波数量为0时表示当前波完成
                if (this.rounding && this.enemyArr.length == 0) {
                    //最后一波
                    if (this.currentRound == this.allRound - 1) {
                        //判断无尽模式
                        if (Main.wujin) {
                            this.currentRound = -1;
                            this.wujinRoundSum += this.allRound;
                            this.hardxs += this.perxs;
                            this.rounding = false;
                        }
                        else {
                            //胜利
                            if (this.life > 0)
                                this.victory();
                        }
                    }
                    else {
                        //每波难度
                        this.rounding = false;
                    }
                }
            }
        }
        for (i = 0; i < this.objArr.length; i++) {
            var tar = this.objArr[i];
            if (tar.canClear) {
                this.objArr.splice(i, 1);
            }
        }
    };
    // 退出关卡，回到事件地图界面
    GuankaBase.prototype.handleBackToWorld = function () {
        this.dispatchEvent(new MainEvent(MainEvent.OpenLoadBar, "maps"));
    };
    /** 点击背景图片 */
    GuankaBase.prototype.bgTouch = function (e) {
        // 获取当前已经选择的对象，若无对象不用做操作，这些对象指的是: 塔、士兵
        var select = Group.selectedItem;
        if (select === null) {
            return;
        }
        var selectParentClassName = egret.getQualifiedSuperclassName(select);
        // 建筑基类
        var arr1 = ["Foundation", "ArrowTowerFoundation", "ShieldTowerBase", "MagicTowerBase", "ExploTowerBase"];
        // 士兵基类
        var arr2 = ["ShieldSoldierBase", "SkillBase"];
        // 若满足下面条件，说明可能展开了建筑建造的工具ui，隐藏工具
        if (arr1.indexOf(selectParentClassName) > -1) {
            this.hideTool();
        }
        // 选择了士兵或者技能
        if (arr2.indexOf(selectParentClassName) > -1) {
            // 取消士兵的选中状态，方法定义在 ShieldSoldierBase.ts
            select.deselectItem();
            // 获取当前手指点击的坐标
            var px = Math.round(e.localX);
            var py = Math.round(e.localY);
            // 可通行
            if (this.checkPoint(px, py)) {
                // 释放技能
                if (selectParentClassName === 'SkillBase') {
                    select.releaseSkills([px, py]);
                }
                else {
                    select.setJihePointEvent([px, py]);
                }
            }
        }
        // 清除选择项
        Group.dispose();
    };
    /**地图网格，参考第三方代码 */
    GuankaBase.prototype.makeGrid = function (path) {
        //解析地图json
        var str = RES.getRes(path);
        var i;
        var j;
        var col = str.MapData.length; //列数
        var row = str.MapData[0].length; //行数
        this.cellSize = str.TileWidth; //边长
        this.grid = new Grid(col, row);
        for (i = 0; i < col; i++) {
            for (j = 0; j < row; j++) {
                if (str.MapData[i][j].val == 1) {
                    this.grid.setWalkable(i, j, false);
                }
            }
        }
    };
    /**检查点击网格是否可通过，参考第三方代码*/
    GuankaBase.prototype.checkPoint = function (xnum, ynum) {
        var xpos = Math.floor(xnum / this.cellSize);
        var ypos = Math.floor(ynum / this.cellSize);
        var endNp = this.grid.getNode(xpos, ypos);
        if (endNp.walkable == false) {
            return false;
        }
        else {
            return true;
        }
    };
    /**再次尝试*/
    GuankaBase.prototype.tryAgainHandle = function (e) { };
    /**关卡胜利*/
    GuankaBase.prototype.victory = function () {
        this.clear();
        // this.guankaUI.showVictory();
        //更新关卡通关数据、塔升级数据
        //StorageSetting.setGuankaPass(Main.curIdx);
        //StorageSetting.setTowerUpgrade(Main.curIdx);
    };
    /**关卡失败*/
    GuankaBase.prototype.lose = function () {
        this.clear();
        // this.guankaUI.showLose();
        //更新关卡数据
        //if(Main.wujin){
        //StorageSetting.setGuankaWujin(Main.curIdx,this.boSum+this.curBo);
        //}
    };
    /**清除*/
    GuankaBase.prototype.clear = function () {
        //停止背景音乐
        SoundManager.stopBgSound();
        //暂停心跳控制器
        egret.stopTick(this.onEnterFrame, this);
        //清空对象池
        ObjectPool.getInstance().destroyAllObject();
    };
    // 创建地基，标记可以造箭塔的位置
    GuankaBase.prototype.createFoundation = function (classFactory) {
        var _this = this;
        this.foundationPosiotionArr.map(function (item, i) {
            // 地基
            var foundation = new classFactory();
            foundation.x = item[0];
            foundation.y = item[1];
            foundation.index = i;
            _this.foundationLayer.addChild(foundation);
            _this.foundationArr.push(foundation);
            foundation.touchEnabled = true;
            // 监听触摸事件
            foundation.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.foundationOrTowerTouch, _this);
            // 自定义事件
            foundation.addEventListener(TowerEvent.ShowTool, _this.showTool, _this);
            foundation.addEventListener(TowerEvent.HideTool, _this.hideTool, _this);
        });
    };
    // 创建怪物轮次（一波一波的怪物）
    GuankaBase.prototype.createEnemies = function (pass) {
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
        else {
            // 累加时间，直到下一轮次开始时间
            this.delayToNextSum += pass;
            if (this.delayToNextSum >= this.delayToNext) {
                // 清空时间累计相关字段
                this.delayToNextSum = 0;
                this.otime = 0;
                // 更新当前轮次
                this.currentRound++;
                // 若当前轮次更新后值小于总轮次，进入下一个轮次
                if (this.currentRound < this.allRound) {
                    // 标记修改：当前有轮次在进行中
                    this.rounding = true;
                    // 怪物数据
                    var monsterData = this.enemyData[this.currentRound];
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
                    }
                    else {
                        this.guankaUI.setRound(this.currentRound + 1, this.allRound);
                    }
                    // 播放开始一轮的音效
                    SoundManager.playEffect("bo_start");
                }
            }
        }
    };
    // 地基\塔被点击
    GuankaBase.prototype.foundationOrTowerTouch = function (e) {
        Group.selectItem(e.currentTarget);
    };
    // 显示建造防御塔的选项工具ui
    GuankaBase.prototype.showTool = function (e) {
        // touchObj: 某个地基、某个防御塔
        var touchObj = e.currentTarget;
        this.tool = new BuildTool(touchObj, this.gold);
        /**
         * 公式推导：
         * this.tool的中点坐标移到touchObj的中点坐标， 先求出 touchObj的中点坐标--(touchObj.x + touchObj.width/2)，赋值给this.tool（记为坐标A(Ax, Ay) = (this.tool.x, this.tool.y)），然后求出this.tool的中点坐标记为坐标B(Bx, By) = (Ax+(this.tool.width/2), Ay+(this.tool.height/2)) ；要将中点B移到坐标A，移动距离A'(A'x, A'y) = (Bx-Ax, By-Ay) = (this.tool.width/2, this.tool.height/2);
         * 故最终this.tool的坐标为：( Ax- A'x, Ay- A'y )
         */
        this.tool.x = (touchObj.x + touchObj.width / 2) - this.tool.width / 2;
        this.tool.y = (touchObj.y + touchObj.height / 2) - this.tool.height / 2;
        this.toolLayer.addChild(this.tool);
        // 监听点击工具图标
        this.tool.addEventListener(ToolEvent.BuildStart, this.buildStart, this);
        this.selectObj = touchObj;
    };
    // 开始建筑---说明：升级塔无需等待, 点击建筑工具的icon触发该方法
    GuankaBase.prototype.buildStart = function (e) {
        // 防御塔类别名称
        var towerName = e.className;
        // 新建一级防御塔，需要添加建造等待动画
        if (['ArrowTower01', 'ShieldTower01', "MagicTower01", "ExploTower01"].indexOf(towerName) > -1) {
            // 播放修建动画
            var buildWait = new BuildWait(towerName, this.selectObj.index);
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
        else 
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
            var index = this.towerArr.indexOf(this.selectObj);
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
    };
    // 建筑完成
    GuankaBase.prototype.buildComplete = function (e) {
        // 从舞台上删除建筑动画
        var waitBuild = e.currentTarget;
        var index = waitBuild.index;
        waitBuild.removeEventListener(ToolEvent.BuildComplete, this.buildComplete, this);
        this.objLayer.removeChild(waitBuild);
        // 移除建筑队列
        var arr = [];
        var tower;
        this.buildQuene.map(function (build) {
            if (build.index === index) {
                tower = build;
            }
            else {
                arr.push(build);
            }
        });
        this.buildQuene = arr;
        if (tower) {
            this.buildTower(tower, tower.className);
        }
    };
    // 创建一个怪物到场景里
    GuankaBase.prototype.addMosters = function (classFactory, roadArr) {
        var monster = ObjectPool.getInstance().createObject(Monster);
        monster.addTexture(classFactory);
        monster.init(roadArr, this.roundMosterLeft, this.roundSpeed, this.roundDamage, this.roundValue);
        this.objLayer.addChild(monster);
        this.enemyArr.push(monster);
        this.objArr.push(monster);
    };
    // 隐藏建造防御塔的选项工具ui
    GuankaBase.prototype.hideTool = function () {
        if (this.tool === null) {
            return;
        }
        this.tool.removeEventListener(ToolEvent.BuildStart, this.buildStart, this);
        this.tool.hide();
        this.tool = null;
    };
    // 创建防御塔
    GuankaBase.prototype.buildTower = function (towerObj, towerName) {
        // 获取防御塔类
        var towerClassName = egret.getDefinitionByName(towerName);
        var tower = new towerClassName();
        tower.x = tower.sx = towerObj.x;
        if (towerObj.towerHeight) {
            tower.y = tower.sy = towerObj.y - towerObj.towerHeight + 15;
        }
        else {
            tower.y = tower.sy = towerObj.y;
        }
        tower.index = towerObj.index;
        tower.targets = this.enemyArr;
        // 防御塔所属基地类
        var foundationParentClassName = egret.getQualifiedSuperclassName(tower);
        if (['ArrowTowerFoundation', 'MagicTowerBase', 'ExploTowerBase'].indexOf(foundationParentClassName) > -1) {
            // 放置子类的容器为游戏场景的武器层
            tower.parentContentLayer = this.weaponLayer;
        }
        else 
        // 选择的塔是防御塔-生成士兵的塔
        if (foundationParentClassName === 'ShieldTowerBase') {
            tower.objArr = this.objArr;
            tower.parentContentLayer = this.objLayer;
            var pointArr = this.soldierPointArr[tower.index];
            // 设置士兵的集合点
            tower.soldierPoint = new egret.Point(pointArr[0], pointArr[1]);
        }
        this.objLayer.addChild(tower);
        this.towerArr.push(tower);
        this.objArr.push(tower);
        tower.touchEnabled = true;
        tower.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.foundationOrTowerTouch, this);
        tower.addEventListener(TowerEvent.ShowTool, this.showTool, this);
        tower.addEventListener(TowerEvent.HideTool, this.hideTool, this);
        tower.init();
    };
    GuankaBase.prototype.destroy = function () {
        ObjectPool.getInstance()._pool = {};
    };
    return GuankaBase;
}(eui.Component));
__reflect(GuankaBase.prototype, "GuankaBase");
