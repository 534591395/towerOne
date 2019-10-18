/**
 * 所有可移动行为的对象基类（向量）
 */

class VectorElements extends Elements {

    // 申明状态机
    protected fsm: StateMachine;
    // 当前对象的状态--比如：移动、死亡、休闲等
    protected currentState: stateType;

    // 路径集合
    protected positionArr: Vector2D[] = [];
    // 最大移动速度
    protected maxSpeed: number;
    // 移动角度
    protected angle: number = 0;
    

    public constructor() {
        super();
    }

    // 实时刷新
    public onEnterFrame(advancedTime :number) {
        // 若对象不在移动状态，无需改变向量
        if (this.currentState !== stateType.moveState) {
            return;
        }
    }
}