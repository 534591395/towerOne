/**
 * 世界地图类（关卡选择界面）
 */

class World extends eui.Component {
    private backToIndex: eui.Image;
    private heroIcon: eui.Image;
    // 无尽模式按钮
    private wujinmoshi: eui.Image;
    // 故事模式按钮
    private gushimoshi: eui.Image;
    // 关闭游戏模式选择框按钮
    private closeBtn: eui.Image;
    // 游戏模式选择框
    private chosePannel: eui.Image;
    // 无尽模式最高通关记录
    private wujinMaxRoundLabel: eui.Label;
    // 当前显示游戏关卡数字ui
    private choseNumberLabel: eui.Label;

    // 关卡旗帜集合
    private flagArr: any[] = [];

    public constructor() {
        super();
        this.skinName = "resource/skins/world.exml";
        // 播放背景音乐
        SoundManager.playBgSound("mapbgsound");
      
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    

    private onAddToStage() {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.guanka();
    }
    
    // 开始处理关卡信息
    private guanka():void {
        TweenMax.to(this.backToIndex, 0.5, {delay: 1, y: 421, ease: Cubic.easeInOut});
        //TweenMax.to(this.heroIcon, 0.5, {delay: 1, y: 397, ease: Cubic.easeInOut});

        this.backToIndex.touchEnabled = true;
        this.backToIndex.addEventListener(egret.TouchEvent.TOUCH_TAP, this.backRun, this);
        this.defalutFlag();
    }

    // 初始化关卡旗帜属性
    private defalutFlag() {
        const arr = GuanKa.getData();
        for (let i = 0; i< arr.length; i++) {
            const item = arr[i];
            // flag 已在eui皮肤里定义
            const flag: eui.Image = this[item.name];
            if (flag) {
                // 该关卡已通关后颜色变化
                if (item.ispass) {
                    flag.source = RES.getRes("flag1");
                }
                // 开启触摸事件
                flag.touchEnabled = true;
                // 显示旗帜动画
                egret.Tween.get(flag).to({ alpha: 1, y: flag.y+30 },300 + i*0.1+1);
                this.flagArr.push(flag);
            }
            // 若当前关卡未通关，跳出循环-- 只显示当前关卡，即未通关的旗帜在界面上只显示一个
            if (!item['ispass']) {
                break;
            }    
        }
        this.addFlagsEvent();
    }

    // 给每个旗帜添加点击监听事件
    private addFlagsEvent() {
        this.flagArr.map((flag, i) => {
            flag.addEventListener(egret.TouchEvent.TOUCH_TAP, this.choseGuanka, this);
        });
    }

    // 移除每个旗帜的点击监听事件 
    private removeFlagsEvent() {
        this.flagArr.map((flag, i) => {
            flag.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.choseGuanka, this);
        });
    }

    // 返回主界面
    private backRun():void {
        this.backToIndex.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.backRun,this);

        this.dispatchEvent(new MainEvent(MainEvent.OpenLoadBar,"welcomeload"));

        SoundManager.stopBgSound();
    }

    // 选择某个关卡
    private choseGuanka(e:egret.TouchEvent) {
        Main.choseNumber = this.flagArr.indexOf(e.currentTarget);
        // 取消所有旗帜的监听（禁止再选择，防止误操作）
        this.removeFlagsEvent();
        // 显示游戏模式选择面板 -- 无尽模式和故事模式
        this.showChosePannel();
    } 

    // 游戏模式选择面板
    private showChosePannel() {
        const arr = GuanKa.getData();
        // 若当前选择的关卡故事模式通关, 可选择无尽模式 
        if (arr[Main.choseNumber]["ispass"]) {
            this.wujinmoshi.touchEnabled = true;
            this.wujinmoshi.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleWujin, this);
        } else {
            this.wujinmoshi.source = RES.getRes("wujinmoshi2");
        }

        // 故事模式按钮
        this.gushimoshi.touchEnabled = true;
        this.gushimoshi.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleGushi, this);
        
        // 关闭按钮
        this.closeBtn.touchEnabled = true;
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleClose, this);

        // 当前显示游戏关卡数字ui
        this.choseNumberLabel.text = (Main.choseNumber + 1).toString();

        // 无尽模式最高通关记录ui
        this.wujinMaxRoundLabel.text = GuanKa.getData()[Main.choseNumber]["wujinMaxRound"];

        // 游戏模式选择框显示动画效果
        TweenMax.to(this.chosePannel, 0.3, {alpha: 1, scaleX: 1, scaleY: 1, ease: Back.easeOut});
    }

    // 进入无尽模式
    private handleWujin() {
        Main.wujin = true;
        this.loadGuanka();
    }

    // 进入故事模式
    private handleGushi() {
        Main.wujin = false;
        this.loadGuanka();
    }

    // 触发加载关卡资源
    private loadGuanka() {
        this.dispatchEvent(new MainEvent(MainEvent.OpenLoadBar, GuanKa.resourceNameArr[Main.choseNumber]));
    }

    // 关闭游戏模式选择框
    private handleClose() {
        // 清除所有监听事件，防止再次显示选择框后添加多次事件
        this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.handleClose, this);
        this.gushimoshi.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.handleGushi, this);
        if(this.wujinmoshi.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            this.wujinmoshi.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.handleWujin, this);
        }
        // 关闭动画效果
        TweenMax.to(this.chosePannel, 0.3, {alpha: 0, scaleX: 0.1, scaleY: 0.1, ease: Back.easeIn, onComplete: () => {
            this.addFlagsEvent();
        }});
    }

    // 
    public destroy():void {
        RES.destroyRes("map");
        // 清除该类下所有补间动画
        TweenMax.killChildTweensOf(this);
        this.removeFlagsEvent();
    }
}