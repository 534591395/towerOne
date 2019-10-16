/**
 * 武器弓箭01
 */

class Arrow01 extends ArrowBase {
    public constructor() {
        super();

        this.view = new egret.MovieClip();
        this.addChild(this.view);
        
        
        const data = RES.getRes("Arrow01json");
        const texture = RES.getRes("Arrow01png");
        const mcf: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data,texture);
        this.view.movieClipData = mcf.generateMovieClipData("Arrow01");
        
        //设置数据属性
        this.damage = 1;
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
        this.isMiss = false;
        this.target = null;
        
        this.view.gotoAndStop(1);
        
        this.t0=0;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.pos = null;
    }
    

    public onEnterFrame(timeStamp:number) {
        super.onEnterFrame(timeStamp);
    }
}