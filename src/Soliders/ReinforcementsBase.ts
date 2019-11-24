/**
 * 玩家技能召唤出来的增援士兵 基类，继承士兵类
 */

class ReinforcementsBase extends ShieldSoldierBase {
    // 该增援士兵存在时间
    protected totalLifeTime: number = 30000;
    protected lifetimesum: number = 0;

    public constructor() {
        super();
        this.view = new egret.MovieClip();
        this.addChild(this.view);
    }


    /**arr.length =2 ,第一个表示士兵产生点，第二个表示士兵集合点  */
    public init(arr: number[][]): void {
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
        this.hp = 400;
        this.positionArr = [];
        this.pathIndex = 0;
        
        //状态初始化
        this.timesum = 0;
        this.lifeBar.reset();
        this.canClear = false;
        this.target = null;
        this.moveToTarget = false;
        this.atJihePoint = false;

        this.lifetimesum = 0;
        this.totalLifeTime = 30000;
        
        this.fsm.changeState(stateType.idleState);
        this.currentState = stateType.idleState;
    }

    public onDestroy(): void {
        // 该对象从场景里移除
        super.onDestroy();
    }


    public onEnterFrame(timeStamp :number) {
        super.onEnterFrame(timeStamp);

        this.lifetimesum += timeStamp;
        if(this.lifetimesum>=this.totalLifeTime){
            this.hp = 0;
            this.lifeBar.reset();
            this.lifeBar.visible = false;
            this.setMoveAngleLabel(90);
            this.lifetimesum = 0;
        }
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
    // public setJihePointEvent(arr: number[]) {
    //     this.dispatchEvent(new SoldierEvent(SoldierEvent.Move, this, arr));
    // }

}