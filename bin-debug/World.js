/**
 * 世界地图类（关卡选择界面）
 */
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
var World = (function (_super) {
    __extends(World, _super);
    function World() {
        var _this = _super.call(this) || this;
        // 关卡旗帜集合
        _this.flagArr = [];
        _this.skinName = "resource/skins/world.exml";
        // 播放背景音乐
        SoundManager.playBgSound("mapbgsound");
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    World.prototype.onAddToStage = function () {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.guanka();
    };
    // 开始处理关卡信息
    World.prototype.guanka = function () {
        TweenMax.to(this.backToIndex, 0.5, { delay: 1, y: 421, ease: Cubic.easeInOut });
        TweenMax.to(this.heroIcon, 0.5, { delay: 1, y: 397, ease: Cubic.easeInOut });
        this.backToIndex.touchEnabled = true;
        this.backToIndex.addEventListener(egret.TouchEvent.TOUCH_TAP, this.backRun, this);
        this.defalutFlag();
    };
    // 初始化关卡旗帜属性
    World.prototype.defalutFlag = function () {
        var _this = this;
        var arr = GuanKa.getData();
        arr.map(function (item, i) {
            // flag 已在eui皮肤里定义
            var flag = _this[item.name];
            if (flag) {
                // 该关卡已通关后颜色变化
                if (item.ispass) {
                    flag.source = RES.getRes("flag1");
                }
                // 开启触摸事件
                flag.touchEnabled = true;
                // 显示动画
                egret.Tween.get(flag).to({ alpha: 1, y: flag.y + 30 }, 300 + i * 0.1 + 1);
                _this.flagArr.push(flag);
            }
        });
        this.addFlagsEvent();
    };
    // 给每个旗帜添加点击监听事件
    World.prototype.addFlagsEvent = function () {
        var _this = this;
        this.flagArr.map(function (flag, i) {
            flag.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.choseGuanka, _this);
        });
    };
    // 移除每个旗帜的点击监听事件 
    World.prototype.removeFlagsEvent = function () {
        var _this = this;
        this.flagArr.map(function (flag, i) {
            flag.removeEventListener(egret.TouchEvent.TOUCH_TAP, _this.choseGuanka, _this);
        });
    };
    // 返回主界面
    World.prototype.backRun = function () {
        this.backToIndex.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.backRun, this);
        this.dispatchEvent(new MainEvent(MainEvent.OpenLoadBar, "welcomeload"));
        SoundManager.stopBgSound();
    };
    // 选择某个关卡
    World.prototype.choseGuanka = function (e) {
        this.choseNumber = this.flagArr.indexOf(e.currentTarget);
        // 取消所有旗帜的监听（禁止再选择，防止误操作）
        this.removeFlagsEvent();
        // 显示游戏模式选择面板 -- 无尽模式和故事模式
        this.showChosePannel();
    };
    // 游戏模式选择面板
    World.prototype.showChosePannel = function () {
        var arr = GuanKa.getData();
        // 若当前选择的关卡故事模式通关, 可选择无尽模式 
        if (arr[this.choseNumber]["ispass"]) {
            this.wujinmoshi.touchEnabled = true;
            this.wujinmoshi.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleWujin, this);
        }
        // 故事模式按钮
        this.gushimoshi.touchEnabled = true;
        this.gushimoshi.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleGushi, this);
        // 关闭按钮
        this.closeBtn.touchEnabled = true;
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleClose, this);
        // 当前显示游戏关卡数字ui
        this.choseNumberLabel.text = (this.choseNumber + 1).toString();
        // 无尽模式最高通关记录ui
        this.wujinMaxRoundLabel.text = GuanKa.getData()[this.choseNumber]["wujinMaxRound"];
        // 游戏模式选择框显示动画效果
        TweenMax.to(this.chosePannel, 0.3, { alpha: 1, scaleX: 1, scaleY: 1, ease: Back.easeOut });
    };
    // 进入无尽模式
    World.prototype.handleWujin = function () {
    };
    // 进入故事模式
    World.prototype.handleGushi = function () {
    };
    // 关闭游戏模式选择框
    World.prototype.handleClose = function () {
        var _this = this;
        // 清除所有监听事件，防止再次显示选择框后添加多次事件
        this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.handleClose, this);
        this.gushimoshi.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.handleGushi, this);
        if (this.wujinmoshi.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            this.wujinmoshi.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.handleWujin, this);
        }
        // 关闭动画效果
        TweenMax.to(this.chosePannel, 0.3, { alpha: 0, scaleX: 0.1, scaleY: 0.1, ease: Back.easeIn, onComplete: function () {
                _this.addFlagsEvent();
            } });
    };
    return World;
}(eui.Component));
__reflect(World.prototype, "World");
