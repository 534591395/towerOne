/**
 * 怪物基类
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
var MonsterBase = (function (_super) {
    __extends(MonsterBase, _super);
    function MonsterBase() {
        var _this = _super.call(this) || this;
        // 怪物是否被杀死标记
        _this.beKill = false;
        /** 怪物是否被攻击 */
        _this.beAttack = false;
        /**死亡中*/
        _this.dieVoiceArr = ["monster_die1", "monster_die2", "monster_die3", "monster_die4"];
        // 申明状态机
        _this.fsm = new StateMachine(_this);
        // 血条
        _this.lifeBar = new LifeBar();
        _this.addChild(_this.lifeBar);
        return _this;
    }
    // 更新生命存活状态
    MonsterBase.prototype.changeLive = function () {
        if (this._hp <= 0) {
            this.fsm.changeState(stateType.deadState);
        }
        if (this._hp > this.life) {
            this._hp = this.life;
        }
    };
    Object.defineProperty(MonsterBase.prototype, "hp", {
        get: function () {
            return this._hp;
        },
        // 外部设置当前生命值后，执行
        set: function (value) {
            this._hp = value;
            this.changeLive();
            this.lifeBar.setProgress(this._hp, this.life);
        },
        enumerable: true,
        configurable: true
    });
    // 碰撞检测--怪物跟攻击目标之间
    MonsterBase.prototype.hittest = function () {
        if (this.target) {
            this.target.hp -= this.damage;
            if (this.target.hp <= 0) {
                this.target.target = null;
                this.target = null;
            }
        }
    };
    /** 销毁： ObjectPool.getInstance().destroyObject 内调用 **/
    MonsterBase.prototype.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
        if (this.target !== null) {
            this.target.target = null;
            this.target = null;
        }
    };
    // 实时刷新
    MonsterBase.prototype.onEnterFrame = function (advancedTime) {
        // 累加时间-用来判断是否到了怪物攻击的时间
        this.timesum += advancedTime;
        // 刷新怪物状态
        this.fsm.onEnterFrame(advancedTime);
        // 移动（向量）
        _super.prototype.onEnterFrame.call(this, advancedTime);
        if (this.canClear) {
            ObjectPool.getInstance().destroyObject(this);
        }
    };
    /**闲置 -- 状态机里执行*/
    MonsterBase.prototype.isIdle = function () {
        this.stateLabel = "idle";
        return true;
    };
    /**移动 -- 状态机里执行*/
    MonsterBase.prototype.isMove = function () {
        //this.stateLabel = "walking";
        return true;
    };
    /**攻击 -- 状态机里执行*/
    MonsterBase.prototype.isFighting = function () {
        this.stateLabel = "fighting";
        return true;
    };
    /**死亡 -- 状态机里执行*/
    MonsterBase.prototype.isDead = function () {
        this.stateLabel = "dead";
        return true;
    };
    // 移动中，状态机里调用
    MonsterBase.prototype.moving = function () {
        // this.angle 在VectorElements里确定
        this.setMoveAngleLabel(this.angle);
        if (this.currentState !== stateType.moveState) {
            this.currentState = stateType.moveState;
            this.view.gotoAndPlay(this.stateLabel);
        }
        //判断目标!=null 则切换到闲置状态 --从移动状态到闲置状态 --
        // 闲置状态-到攻击状态
        if (this.target != null) {
            this.fsm.changeState(stateType.idleState);
        }
        this.checkLast(this.stateLabel, this.view.currentFrame);
    };
    /**闲置中*/
    MonsterBase.prototype.idling = function () {
        if (!(this.currentState == stateType.idleState)) {
            this.currentState = stateType.idleState;
            this.view.gotoAndStop(this.stateLabel);
        }
        this.moveOrFight();
    };
    /**移动完毕 */
    MonsterBase.prototype.movingEnd = function () {
        if (this.currentState !== stateType.moveEndState) {
            this.currentState = stateType.moveEndState;
            this.canClear = true;
        }
    };
    /**攻击中 */
    MonsterBase.prototype.fighting = function () {
        if (this.currentState !== stateType.fightState) {
            this.currentState = stateType.fightState;
            this.view.gotoAndPlay(this.stateLabel);
            // 攻击方向
            if (this.target !== null) {
                // 正方向
                if (this.x <= this.target.x) {
                    this.view.scaleX = 1;
                }
                else {
                    this.view.scaleX = -1;
                }
            }
        }
        this.checkLastEnd(this.stateLabel);
    };
    /**攻击完毕-碰撞检测*/
    MonsterBase.prototype.fightingEnd = function () {
        if (!(this.currentState == stateType.fightEndState)) {
            this.currentState = stateType.fightEndState;
            this.hittest();
            this.timesum = 0;
        }
        //攻击完毕敌人若死亡切换到移动状态
        if (this.target == null) {
            this.fsm.changeState(stateType.moveState);
        }
        else {
            //循环攻击
            if (this.timesum >= this.fireDelay) {
                //攻击之前检测目标是否活着
                this.moveOrFight();
                this.fsm.changeState(stateType.fightState);
                this.timesum = 0;
            }
        }
    };
    MonsterBase.prototype.dying = function () {
        if (!(this.currentState == stateType.deadState)) {
            this.currentState = stateType.deadState;
            this.view.gotoAndPlay(this.stateLabel);
            //死亡音效
            var idx = Math.floor(Math.random() * 4);
            // SoundManager.playEffect(this.dieVoiceArr[idx]);
        }
        this.checkLastEnd(this.stateLabel);
    };
    /**死亡完毕-可以消除*/
    MonsterBase.prototype.dyingEnd = function () {
        if (!(this.currentState == stateType.deadEndState)) {
            this.currentState = stateType.deadEndState;
            this.beKill = true;
            this.canClear = true;
        }
    };
    /** 移动方向判断-- 动画帧lable确定， 通用判断 */
    MonsterBase.prototype.setMoveAngleLabel = function (angle) {
        if (angle >= 0 && angle <= 60 || angle >= 300 && angle <= 360) {
            this.stateLabel = "walking";
            this.view.scaleX = 1;
        }
        else if (angle > 60 && angle < 120) {
            this.stateLabel = "walkingDown";
        }
        else if (angle >= 120 && angle <= 240) {
            this.stateLabel = "walking";
            this.view.scaleX = -1;
        }
        else if (angle > 240 && angle < 300) {
            this.stateLabel = "walkingUp";
        }
    };
    MonsterBase.prototype.getFrameLable = function (movieClipData, nextFrame) {
        var label = '';
        var labels = movieClipData.labels || [];
        labels.map(function (item, i) {
            if (i === labels.length - 1) {
                if (nextFrame >= item.frame && nextFrame <= movieClipData.numFrames) {
                    label = item.name;
                }
            }
            else if (labels[i + 1]) {
                if (nextFrame >= item.frame && nextFrame < labels[i + 1].frame) {
                    label = item.name;
                }
            }
        });
        return label;
    };
    /**循环播放检查*/
    MonsterBase.prototype.checkLast = function (str, currentFrame) {
        var nextFrameNum = currentFrame + 1;
        var movieClipData = this.view.movieClipData;
        var mz = this.getFrameLable(movieClipData, nextFrameNum);
        //const mz: string = movieClipData.getKeyFrameData(nextFrameNum).name;
        if (mz != str) {
            this.view.gotoAndPlay(str);
        }
    };
    /**播放结束检查*/
    MonsterBase.prototype.checkLastEnd = function (curLabel) {
        var nextFrameNum = this.view.currentFrame + 1;
        var movieClipData = this.view.movieClipData;
        var label = movieClipData.getKeyFrameData(nextFrameNum).name;
        if (label != curLabel || this.view.currentFrame >= this.view.totalFrames) {
            this.view.stop();
            if (this.currentState == stateType.fightState) {
                this.fsm.changeState(stateType.fightEndState);
            }
            else if (this.currentState == stateType.deadState) {
                this.fsm.changeState(stateType.deadEndState);
            }
        }
    };
    /**判断目标!=null 且目标距离达到攻击距离时则切换到攻击状态 若目标==null则切换到移动状态*/
    MonsterBase.prototype.moveOrFight = function () {
        if (this.target !== null) {
            if (this.beAttack) {
                this.fsm.changeState(stateType.fightState);
            }
            else {
                this.fsm.changeState(stateType.idleState);
            }
        }
        else {
            this.beAttack = false;
            this.fsm.changeState(stateType.moveState);
        }
    };
    return MonsterBase;
}(VectorElements));
__reflect(MonsterBase.prototype, "MonsterBase");
