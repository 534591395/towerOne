/**
 * 魔法弹
 */

class MagicBullet010203 extends MagicBulletBase {
    public constructor() {
        super();

        this.view = new egret.MovieClip();
        this.addChild(this.view);

        const data = RES.getRes("MagicBullet010203json");
        const texture = RES.getRes("MagicBullet010203png");
        const mcf: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data,texture);
        this.view.movieClipData = mcf.generateMovieClipData("MagicBullet010203");
    }

    public onCreate(): void {
        this.canClear = false;
        this.isHit = false;
        this.follow = false;
        this.isTravel = true;
        this.target = null;

        this.maxSpeed = 2;

        this.fsm.changeState(stateType.idleState);
    }

    public init(p:egret.Point, target:any): void {
        this.target = target;
        this.position.x = this.x = p.x;
        this.position.y = this.y = p.y;
        
        this.setPositionArr();
    }

    public onEnterFrame(timeStamp:number) {
        super.onEnterFrame(timeStamp);
    }
}