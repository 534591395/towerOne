/**
 * 所有可移动行为的对象基类（向量）
 * 转向合力-Steering Behaviors  文档：游戏中向量知识.md
链接：http://note.youdao.com/noteshare?id=320fbe16c6e2d8069573f8d614208b7e&sub=240CF72068D84C7C81044C5B700ADD09

参考： https://cloud.tencent.com/developer/article/1005839
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
var VectorElements = (function (_super) {
    __extends(VectorElements, _super);
    function VectorElements() {
        var _this = _super.call(this) || this;
        /** 路径集合 */
        _this.positionArr = [];
        /** 移动角度--播放对应动画帧需要 */
        _this.angle = 0;
        /** 到达终点阈值-- 当前点和目标点的距离 dist <= arrivalThreshold ，表示到达终点 */
        _this.arrivalThreshold = 2;
        /** 路径阈值-- 当前点到目标点的距离，dist < pathThreshold ，表示当前路径点走完，到下一个路径点 */
        _this.pathThreshold = 5;
        // 初始化向量
        _this.position = new Vector2D();
        _this.velocity = new Vector2D();
        _this.steeringForce = new Vector2D();
        return _this;
    }
    // 实时刷新
    VectorElements.prototype.onEnterFrame = function (advancedTime) {
        // 若对象不在移动状态，无需改变向量
        if (this.currentState !== stateType.moveState) {
            return;
        }
        this.followPath(this.positionArr);
        this.velocity = this.velocity.add(this.steeringForce);
        // 重置
        this.steeringForce = new Vector2D();
        // 截断速度：转向力会被截断在一个范围，防止其超过个体最大可承受力。被截断的转向力会除以个体的质量，因为不同重量的物体运动快慢是不同的。
        this.velocity.truncate(this.maxSpeed);
        // 一个个体在位置（x，y），并且它的速度是（a, b）。它的移动用欧拉积分表示为position = position + velocity
        this.position = this.position.add(this.velocity);
        // 更新坐标
        this.x = this.position.x;
        this.y = this.position.y;
        // 更新角度--播放动画帧需要
        this.angle = (this.velocity.angle * 180 / Math.PI + 360) % 360;
    };
    // 寻找行为
    VectorElements.prototype.seek = function (target) {
        // Seek行为被分解为两个力：目标速度，和转向速度。 目标速度始终朝向目标位置，转向力是目标速度减去个体的当前速度得出的，它的物理意义就是向着目标位置给个体一个推力。
        // 目标速度：首先计算需运行的距离，然后转化单位向量，保留移动方向，最后乘以移动速度，得出值
        var desiredVelocity = target.subtract(this.position);
        // 转为单位向量，保留方向
        desiredVelocity = desiredVelocity.normalize();
        // 计算当前目标速度
        desiredVelocity = desiredVelocity.multiply(this.maxSpeed);
        // 转向速度，转向力，目标速度减去个体的当前速度得出
        var force = desiredVelocity.subtract(this.velocity);
        // steeringForce 每次帧更新，会重置。这里只是做标记：实际意义  velocity = steeringForce
        this.steeringForce = this.steeringForce.add(force);
    };
    // 到达行为，在最后一个路径点内行走行为，里面实现参考 this.seek
    VectorElements.prototype.arrive = function (target) {
        var desiredVelocity = target.subtract(this.position);
        desiredVelocity.normalize();
        // 当前点和目标点的距离
        var dist = this.position.dist(target);
        // 未达到
        if (dist > this.arrivalThreshold) {
            desiredVelocity = desiredVelocity.multiply(this.maxSpeed);
        }
        else {
            // 已到达，速度清零, 个体停止走动
            desiredVelocity = desiredVelocity.zero();
            this.velocity = this.velocity.zero();
            // 个体路径点走完表示逃脱，本路径点走完则状态切换到移动完成
            this.fsm.changeState(stateType.moveEndState);
        }
        var force = desiredVelocity.subtract(this.velocity);
        this.steeringForce = this.steeringForce.add(force);
    };
    // 路径点
    VectorElements.prototype.followPath = function (paths, loop) {
        if (loop === void 0) { loop = false; }
        var wayPoint = paths[this.pathIndex];
        if (wayPoint == null) {
            return;
        }
        // 说明已走完当前路径点
        if (this.position.dist(wayPoint) < this.pathThreshold) {
            if (this.pathIndex >= paths.length - 1) {
                // 无限循环
                if (loop) {
                    this.pathIndex = 0;
                }
            }
            else {
                // 下一个点
                this.pathIndex++;
            }
        }
        // 判断是否到减速点（达到点）-- 最后一个点
        if (this.pathIndex >= (paths.length - 1) && !loop) {
            this.arrive(wayPoint);
        }
        else {
            // 否则继续寻找行走
            this.seek(wayPoint);
        }
    };
    return VectorElements;
}(Elements));
__reflect(VectorElements.prototype, "VectorElements");
