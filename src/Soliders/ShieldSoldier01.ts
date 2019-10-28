/**
 * 盾塔- 士兵小队--士兵类
 */

class ShieldSoldier01 extends ShieldSoldierBase {
    public constructor() {
        super();

        this.view = new egret.MovieClip();
        this.addChild(this.view);

        this.addTexture();
    }
    
    /**arr.length =2 ,第一个表示士兵产生点，第二个表示士兵集合点  */
    public init(arr: number[][]): void {
        this.hp = this.life;
        this.atJihePoint = true;
        // 默认初始位置在防御塔的中心（椭圆中心），然后移动到指定的集合点
        this.position.x = this.x = arr[0][0];
        this.position.y = this.y = arr[0][1];

        arr.map(item => {
            let point = new Vector2D(item[0] + this.xoffset, item[1] + this.yoffset);
            this.positionArr.push(point);
        });
        this.jihePoint = this.positionArr[this.positionArr.length-1];

        this.fsm.changeState(stateType.moveState);
    }

    /**创建*/
    public onCreate():void {
        //数据初始化
        this.positionArr = [];
        this.pathIndex = 0;
        
        //状态初始化
        this.timesum = 0;
        this.lifeBar.reset();
        this.canClear = false;
        this.target = null;
        this.moveToTarget = false;
        this.atJihePoint = false;
        
        this.fsm.changeState(stateType.idleState);
        this.currentState = stateType.idleState;

        // 士兵可以触摸
        this.view.touchEnabled = true;
        this.view.addEventListener(egret.TouchEvent.TOUCH_TAP, this.viewSelect, this);
    }

	/**添加纹理 初始化数据*/
    public addTexture(){
        //获取贴图
        const data = RES.getRes("ShieldSoilder01json");
        const texture = RES.getRes("ShieldSoilder01png");
        const mcf: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data,texture);
        this.view.movieClipData = mcf.generateMovieClipData("ShieldSoilder01");
        this.view.x = this.view.width / 2;
        this.view.anchorOffsetX = this.view.width / 2;
        //血条位置
        this.lifeBar.x = 27;
        this.lifeBar.y = 10;
        this.maxSpeed = 0.6;
        
        this.fireDelay = 1000;
	}


    public onDestroy(): void {
        super.onDestroy();
        this.view.touchEnabled = false;
        this.view.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.viewSelect, this);
    }

    public onEnterFrame(timeStamp: number) {
        super.onEnterFrame(timeStamp);
    }

    /** 设置士兵的集合点，并移动 */
    public setJihePointToMove(arr: number[]) {
        this.atJihePoint = true;
        this.pathIndex = 0;
        this.positionArr = [];
        this.jihePoint = new Vector2D(arr[0] + this.xoffset, arr[1] + this.yoffset);
        this.positionArr.push(this.jihePoint);
        // 改为移动状态
        this.fsm.changeState(stateType.moveState);

        if (this.target === null) {
            return;
        }
        // 清空怪物和士兵的攻击目标
        if (this.target.target !== null) {
            this.target.target = null;
        }
        this.target = null;
    }

    /**设置新的集结点触发自定义事件, 在关卡基类中点击背景图片调用 */
    public setJihePointEvent(arr: number[]) {
        this.dispatchEvent(new SoldierEvent(SoldierEvent.Move, this, arr));
    }

    /** 选中士兵 */
    private viewSelect(e: egret.TouchEvent) {
        Group.selectItem(this);
    }
}