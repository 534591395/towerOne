/**
 * 防御塔的士兵-- 防御塔会派出士兵在路上拦截怪物
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
var ShieldSoldierBase = (function (_super) {
    __extends(ShieldSoldierBase, _super);
    function ShieldSoldierBase() {
        var _this = _super.call(this) || this;
        // 进入攻击范围的敌人集合
        _this.atargets = [];
        /**相对于集结点的偏移量 */
        _this.xoffset = 0;
        _this.yoffset = 0;
        /** 该士兵是否在集合点上 */
        _this.atJihePoint = false;
        /** 士兵是否移动到敌人坐标 */
        _this.moveToTarget = false;
        /**攻击范围最大半径*/
        _this.maxSoldierRadius = 60;
        /**攻击范围最小半径*/
        _this.minSoldierRadius = 40;
        /**攻击音效数组*/
        _this.voiceArr = ["shield_fire1", "shield_fire2", "shield_fire3"];
        _this.ratioSoldierY = _this.minSoldierRadius / _this.maxSoldierRadius;
        // 申明状态机
        _this.fsm = new StateMachine(_this);
        // 血条
        _this.lifeBar = new LifeBar();
        _this.addChild(_this.lifeBar);
        return _this;
    }
    // 更新生命存活状态
    ShieldSoldierBase.prototype.changeLive = function () {
        if (this._hp <= 0) {
            this.fsm.changeState(stateType.deadState);
        }
        if (this._hp > this.life) {
            this._hp = this.life;
        }
    };
    /** 选中时调用 */
    ShieldSoldierBase.prototype.select = function () {
        this.view.touchEnabled = true;
    };
    /** 取消选中时调用 */
    ShieldSoldierBase.prototype.deselect = function () {
        this.view.touchEnabled = false;
    };
    Object.defineProperty(ShieldSoldierBase.prototype, "hp", {
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
    // 选中
    ShieldSoldierBase.prototype.selectItem = function () {
        this.dispatchEvent(new SoldierEvent(SoldierEvent.Select, this));
    };
    // 取消
    ShieldSoldierBase.prototype.deselectItem = function () {
        this.dispatchEvent(new SoldierEvent(SoldierEvent.Deselect, this));
    };
    // 重置
    ShieldSoldierBase.prototype.reselectItem = function () {
    };
    // 碰撞检测--跟攻击目标之间
    ShieldSoldierBase.prototype.hittest = function () {
        if (this.target) {
            this.target.hp -= this.damage;
            //console.log('敌人的血量:', this.target.hp);
            if (this.target.hp <= 0) {
                // 将被消灭的敌人从敌人集合里移除
                var index = this.targets.indexOf(this.target);
                if (index > -1) {
                    this.targets.splice(index, 1);
                }
                // 将被消灭的敌人从进入攻击范围敌人集合里移除
                index = this.atargets.indexOf(this.target);
                if (index > -1) {
                    this.atargets.splice(index, 1);
                }
                this.target.target = null;
                this.target = null;
            }
        }
    };
    ShieldSoldierBase.prototype.onDestroy = function () {
        // 该对象从场景里移除
        _super.prototype.onDestroy.call(this);
        if (this.target !== null) {
            this.target.target = null;
            this.target = null;
        }
    };
    ShieldSoldierBase.prototype.onEnterFrame = function (timeStamp) {
        // 累加时间-用来判断是否到了怪物攻击的时间
        this.timesum += timeStamp;
        // 刷新怪物状态
        this.fsm.onEnterFrame(timeStamp);
        // 移动（向量）
        _super.prototype.onEnterFrame.call(this, timeStamp);
        if (this.canClear) {
            ObjectPool.getInstance().destroyObject(this);
        }
    };
    /**闲置 -- 状态机里执行*/
    ShieldSoldierBase.prototype.isIdle = function () {
        this.stateLabel = "idle";
        return true;
    };
    /**移动 -- 状态机里执行*/
    ShieldSoldierBase.prototype.isMove = function () {
        return true;
    };
    /**攻击 -- 状态机里执行*/
    ShieldSoldierBase.prototype.isFighting = function () {
        this.stateLabel = "fighting";
        return true;
    };
    /**死亡 -- 状态机里执行*/
    ShieldSoldierBase.prototype.isDead = function () {
        this.stateLabel = "dead";
        return true;
    };
    /**闲置中*/
    ShieldSoldierBase.prototype.idling = function () {
        if (this.currentState !== stateType.idleState) {
            this.currentState = stateType.idleState;
            this.view.gotoAndStop(this.stateLabel);
        }
        //console.log('休闲中。。状态', this.stateLabel);
        this.moveOrFight();
        //console.log('休闲中执行了moveOrFight。。状态', this.stateLabel);
    };
    // 移动中，状态机里调用
    ShieldSoldierBase.prototype.moving = function () {
        // this.angle 在VectorElements里确定
        this.setMoveAngleLabel(this.angle);
        if (this.currentState !== stateType.moveState) {
            this.currentState = stateType.moveState;
            this.view.gotoAndPlay(this.stateLabel);
        }
        //判断目标!=null 则切换到闲置状态 --从移动状态到闲置状态 --
        // if(this.target!=null){
        //     this.fsm.changeState(stateType.idleState);
        // }
        // 实时切换状态
        this.checkLast(this.stateLabel, this.view.currentFrame);
    };
    /**攻击完毕-碰撞检测*/
    ShieldSoldierBase.prototype.fightingEnd = function () {
        if (this.currentState !== stateType.fightEndState) {
            this.currentState = stateType.fightEndState;
            this.hittest();
            this.timesum = 0;
        }
        //攻击完毕敌人若死亡切换到休闲状态
        //console.log('执行到fightingEnd', this.target);
        if (this.target == null) {
            this.fsm.changeState(stateType.idleState);
        }
        else {
            //循环攻击
            if (this.timesum >= this.fireDelay) {
                this.fsm.changeState(stateType.fightState);
                this.timesum = 0;
            }
        }
    };
    /** 士兵死亡中 */
    ShieldSoldierBase.prototype.dying = function () {
        if (this.currentState !== stateType.deadState) {
            this.currentState = stateType.deadState;
            this.view.gotoAndPlay(this.stateLabel);
        }
        this.checkLastEnd(this.stateLabel);
    };
    /**死亡完毕-可以消除*/
    ShieldSoldierBase.prototype.dyingEnd = function () {
        if (this.currentState !== stateType.deadEndState) {
            this.currentState = stateType.deadEndState;
            this.canClear = true;
        }
    };
    /**移动完毕 */
    ShieldSoldierBase.prototype.movingEnd = function () {
        if (this.currentState !== stateType.moveEndState) {
            this.currentState = stateType.moveEndState;
            this.fsm.changeState(stateType.idleState);
            //console.log('移动完毕');
        }
    };
    /**攻击中 */
    ShieldSoldierBase.prototype.fighting = function () {
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
            //播放攻击音效
            var idx = Math.floor(Math.random() * 3);
            //SoundManager.playEffect(this.voiceArr[idx]);
        }
        this.checkLastEnd(this.stateLabel);
    };
    // 根据播放帧序列号获取帧lable
    ShieldSoldierBase.prototype.getFrameLable = function (movieClipData, nextFrame) {
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
    /**循环播放检查，当播放的帧lable跟指定的stateLabel不一致时，播放stateLabel  */
    ShieldSoldierBase.prototype.checkLast = function (str, currentFrame) {
        var nextFrameNum = currentFrame + 1;
        var movieClipData = this.view.movieClipData;
        var mz = this.getFrameLable(movieClipData, nextFrameNum);
        if (mz != str) {
            this.view.gotoAndPlay(str);
        }
    };
    /**播放结束检查， 结束了再判断接下来该播放哪个帧lable，修改状态 */
    ShieldSoldierBase.prototype.checkLastEnd = function (curLabel) {
        var nextFrameNum = this.view.currentFrame + 1;
        var movieClipData = this.view.movieClipData;
        var label = this.getFrameLable(movieClipData, nextFrameNum);
        if (label != curLabel || this.view.currentFrame >= this.view.totalFrames) {
            this.view.stop();
            //console.log('攻击结束：', this.currentState);
            if (this.currentState == stateType.fightState) {
                this.fsm.changeState(stateType.fightEndState);
            }
            else if (this.currentState == stateType.deadState) {
                this.fsm.changeState(stateType.deadEndState);
            }
        }
    };
    /** 移动方向判断-- 动画帧lable确定， 通用判断 */
    ShieldSoldierBase.prototype.setMoveAngleLabel = function (angle) {
        if (angle >= 0 && angle <= 90 || angle >= 270 && angle <= 360) {
            this.stateLabel = "running";
            this.view.scaleX = 1;
        }
        else if (angle > 90 && angle < 270) {
            this.stateLabel = "running";
            this.view.scaleX = -1;
        }
    };
    /**判断目标!=null 且目标距离达到攻击距离时则切换到攻击状态 若目标==null则切换到移动状态*/
    ShieldSoldierBase.prototype.moveOrFight = function () {
        this.setTarget();
        //console.log('设置敌人', this.target);
        // 若当前士兵指定了攻击目标，让士兵移动到目标点，开始攻击
        if (this.target) {
            // 移动到目标点
            if (!this.moveToTarget) {
                this.moveToTarget = true;
                this.target.beAttack = false;
                this.atJihePoint = false;
                // 设置移动距离
                var tx = void 0;
                var ty = void 0;
                // 设置移动的目标点在怪物左右附近
                if (this.target.x < this.x) {
                    tx = this.target.x + 16;
                }
                else {
                    tx = this.target.x - 16;
                }
                ty = this.target.y + 2;
                this.setPathToMove(new Vector2D(tx, ty));
            }
            else {
                //士兵已经到目标点，开始攻击
                this.moveToTarget = false;
                this.fsm.changeState(stateType.fightState);
                // 敌人状态改成被攻击，请看怪物类
                this.target.beAttack = true;
            }
        }
        else {
            this.moveToTarget = false;
            // 若可攻击敌人集合为空，士兵回到集合点
            if (this.atargets.length === 0) {
                //console.log('this.atargets.length=0,this.atJihePoint, this.jihePoint',this.atJihePoint, this.jihePoint);
                // 若士兵不在集合点，移动到集合点
                if (!this.atJihePoint) {
                    this.atJihePoint = true;
                    this.setPathToMove(this.jihePoint);
                }
            }
        }
    };
    /** 设置新的路径点，并移动 */
    ShieldSoldierBase.prototype.setPathToMove = function (v2d) {
        this.pathIndex = 0;
        this.positionArr = [];
        this.positionArr.push(v2d);
        // 执行状态机，会执行 this.moving
        this.fsm.changeState(stateType.moveState);
    };
    // 互相攻击目标
    ShieldSoldierBase.prototype.setTarget = function () {
        var _this = this;
        this.atargets = [];
        this.targets.map(function (target) {
            // 判断是否进入攻击范围
            var isIn = Utiles.containsXY(target.x, target.y, _this.x, _this.y, _this.maxSoldierRadius, _this.ratioSoldierY);
            var index = _this.atargets.indexOf(target);
            if (isIn) {
                if (index === -1) {
                    _this.atargets.push(target);
                }
            }
            else {
                // 移除已经离开攻击范围的敌人
                if (index > -1) {
                    _this.atargets.splice(index, 1);
                }
            }
        });
        if (this.target !== null) {
            return;
        }
        // 互相设置攻击目标
        this.atargets.map(function (target) {
            if (target.target === null && _this.target === null) {
                target.target = _this;
                _this.target = target;
            }
        });
    };
    return ShieldSoldierBase;
}(VectorElements));
__reflect(ShieldSoldierBase.prototype, "ShieldSoldierBase");
