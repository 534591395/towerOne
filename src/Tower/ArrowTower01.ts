/**
 * 箭塔--等级：一级， 地基为 ArrowTowerFoundation
 */

class ArrowTower01 extends ArrowTowerFoundation {

    // 箭塔上有两个弓箭手, shooter01 在左边，shooter02 在右边
    private shooter01: ArrowShooter01;
    private shooter02: ArrowShooter01;

    // 武器
    private weapon: Arrow01;


    public constructor() {
        super();

        this.addChild(Utiles.createBitmapByName("ArrowTower01"));

        // 加入弓箭手
        this.shooter01 = new ArrowShooter01();
        this.shooter01.x = 36;
        this.shooter01.y = 15;
        this.addChild(this.shooter01);
        
        this.shooter02 = new ArrowShooter01();
        this.shooter02.x = 50;
        this.shooter02.y = 15;
        this.addChild(this.shooter02);

        // 延迟攻击时间
        this.fireDelay = 1000;
    }

    // 帧率执行回调方法，实时刷新
    public onEnterFrame(timeStamp:number) {
        super.onEnterFrame(timeStamp);
        
        this.shooter01.onEnterFrame(timeStamp);
        this.shooter02.onEnterFrame(timeStamp);

        // 若没有敌人进入攻击范围，停止攻击
        if (this.atargets.length === 0) {
            this.timesum = this.fireDelay;
            return;
        }

        // 时间累积，设置攻击间隔
        this.timesum += timeStamp;
        // 攻击间隔时间未到
        if (this.timesum < this.fireDelay) {
            return;
        }
        this.timesum = 0;

        // 获取第一个敌人
        this.target = this.atargets[0];

        // 确定敌人方向
        if(this.target.x>=this.sx && this.target.y<=this.sy-22){
            this.direct = "upRight";
        }
        if(this.target.x>=this.sx && this.target.y>this.sy-22){
            this.direct = "downRight";
        }     
        if(this.target.x<this.sx && this.target.y<=this.sy-22){
            this.direct = "upLeft";
        }
        if(this.target.x<this.sx && this.target.y>this.sy-22){
            this.direct = "downLeft";
        }

        // 播放射击音效
        //this.playFireVoice();

        // 两个射手轮流射击
        // 弓箭发射（产生点）的坐标点
        let p: egret.Point;
        if (this.firststrike === "L") {
            this.shooter01.file(this.direct);
            this.firststrike = "R";
            p = new egret.Point(this.sx-5,this.sy - 46);
        } else 
        if (this.firststrike === "R") {
            this.shooter02.file(this.direct);
            this.firststrike = "L";
            p = new egret.Point(this.sx+5,this.sy - 46);
        }

        //利用对象池产生弓箭对象并进行碰撞检测
        this.weapon = <Arrow01>ObjectPool.getInstance().createObject(Arrow01);
        this.weapon.damage = 4;
        this.weapon.init(p,this.target,this.target.offy);
        this.parentContentLayer.addChild(this.weapon);
    }
}