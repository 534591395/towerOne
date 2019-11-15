/**
 * 技能：火球
 */
class FireBall extends FireBallBase {
    constructor() {
        super();
        this.ratioSoldY = this.minSoldRadius / this.maxSoldRadius;
        this.view = new egret.MovieClip();
        this.addChild(this.view);
        
        const data = RES.getRes("stone1json");
        const texture = RES.getRes("stone1png");
        const mcf: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data,texture);
        this.view.movieClipData = mcf.generateMovieClipData("stone1");
        this.view.x = this.view.width / 2;
    }

    public init(xnum:number,ynum:number):void {
        this.p = new egret.Point(xnum,ynum);
        this.position.x = this.x = xnum;
        this.position.y = this.y = ynum - 480;
        
        this.setPositionArr();
    }

    public onEnterFrame(timeStamp:number) {
        super.onEnterFrame(timeStamp);
    }

    public onCreate(): void {}

}