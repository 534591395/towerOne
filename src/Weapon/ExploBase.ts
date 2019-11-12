/**
 * 武器炮弹基类
 */

class ExploBase extends Elements {
    // 是否击中目标
    public isHit: boolean = false;
    // 是否跟踪目标
    public follow: boolean = false;
    /** 触发攻击时候的起始坐标（产生点）*/
    public p: egret.Point;
    // 单一目标
    public target: any;
    // 瞄向目标向上偏移量
    public offy: number;
    // 弓箭箭头向下的角度
    public angle: number;

    /**进入到炮弹攻击范围的敌人数组，炮弹是群攻，所以设置可攻击敌人时，无需判断该敌人是否有被攻击*/
    public atargets: any[];

    /**攻击范围最大半径*/
    protected maxSoldRadius: number = 40;
    /**攻击范围最小半径*/
    protected minSoldRadius: number = 40;
    /**将圆沿y轴压扁变为椭圆时候的比例*/
    protected ratioSoldY: number;

    public view: egret.MovieClip;

    // 运动轨迹相关参数
    // x轴方向的速度
    protected xSpeed: number;
    // y轴方向的速度
    protected ySpeed: number;
    // 射出的箭运行的时间（做抛物线运动）
    protected t0:number = 0;
    protected t1:number = 25;
    protected g:number = 1;//重力
    /**目标位置 */
    protected pos: egret.Point;

    public constructor() {
        super();
         this.ratioSoldY = this.minSoldRadius / this.maxSoldRadius;
    }

    public init(p:egret.Point,tar:any,offy:number) {
        //设置目标状态
        this.x = p.x;
        this.y = p.y;
        this.p = p;
        this.target = tar;
        this.offy = offy;
        this.setTarget(this.target.x,this.target.y-this.offy);
        this.follow = true;
    }

    public onCreate() {
        this.canClear = false;
        this.isHit = false;
        this.follow = false;
        this.target = null;
        
        this.view.gotoAndStop(1);
        
        this.t0=0;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.pos = null;
    }
    
    // 公式说明：y轴自由落体h的高度计算公式-- h = (gt^2)/2 ; 距离公式-- s = vt; 求实际运行距离（非位移）；
    // 参考：：http://note.youdao.com/noteshare?id=5ea278d1f8e3de02e6cf5637e3052818&sub=9514F035D01E4CA3A136C860A112BB55
    /**计算双轴速度*/
    public setTarget(x: number,y: number): void {
        this.pos = new egret.Point(x,y);
        //根据终点计算双轴速度
        this.xSpeed = (this.pos.x - this.p.x) / this.t1;
        this.ySpeed = (((this.pos.y - this.p.y) - ((this.g * this.t1) * (this.t1 / 2))) / this.t1);
    }

    /**移动*/
    public move() {
        this.setTarget(this.target.x,this.target.y - this.offy);

        this.t0 += 0.5;
        this.x = (this.p.x + (this.t0 * this.xSpeed));
        this.y = ((this.p.y + (this.t0 * this.ySpeed)) + (((this.g * this.t0) * this.t0) / 2));
        this.t0 += 0.5;
        var Sx: number = (this.p.x + (this.t0 * this.xSpeed));
        var Sy: number = ((this.p.y + (this.t0 * this.ySpeed)) + (((this.g * this.t0) * this.t0) / 2));
        this.t0 -= 0.5;
        var dx: number = Sx - this.x;
        var dy: number = Sy - this.y;
        //根据弓箭的角度来允许碰撞
        this.angle = Math.atan2(dy,dx) * 180 / Math.PI + 180;
    }

    public onEnterFrame(timeStamp: number) {
        //刷新
        this.update();
        //击中
        if(this.isHit) {
            this.view.gotoAndPlay("hit");
            this.isHit = false;
        }
        //播放完成
        if(this.view.currentLabel == "hitEnd" || this.view.currentLabel == "missEnd") {
            this.canClear = true;
        }
        //销毁
        if(this.canClear) {
            ObjectPool.getInstance().destroyObject(this);
        }
    }

    public update() {
        if(this.follow) {
            this.move();
            this.hittest();
        }
    }

    /**碰撞检测，参考第三方*/
    // target值设置说明：在塔执行fire时，target = this.atargets[0]； 每次检测时，保证target是活着的。 
    public hittest(): void {
        //允许攻击角度
        if(this.angle >= 0 && this.angle <= 180)
            return;
        //
        let disx: number = this.x - this.target.x < 0 ? this.target.x - this.x : this.x - this.target.x;
        let disy: number = this.y - this.target.y-this.offy < 0 ? this.target.y-this.offy - this.y : this.y - this.target.y-this.offy;
        //精确到1个像素内
        if(disx <= 1 && disy <= 1) {
            // 进入攻击范围的敌人
            this.atargets = [];
            this.targets.map(item => {
                const isIn: boolean = Utiles.containsXY(item.x,item.y,this.x,this.x,this.maxSoldRadius,this.ratioSoldY);
                const index = this.atargets.indexOf(item);
                if (isIn && item.hp > 0) {
                    if (index === -1) {
                        this.atargets.push(item);
                    }
                } else {
                    // 已经不在该塔的攻击范围内
                    if (index > -1) {
                        this.atargets.splice(index, 1);
                    }
                }
            });
            this.atargets.map(item => {
                item.hp -= this.damage;
            });
            this.isHit = true;
            this.follow = false;

            //
            //SoundManager.playEffect("explo_fireend1");
        }
    }
}