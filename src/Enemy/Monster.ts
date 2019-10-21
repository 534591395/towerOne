/**
 * 怪物类
 */

class Monster extends MonsterBase {
    public constructor() {
        super();

        this.view = new egret.MovieClip();
        this.addChild(this.view);
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
        this.beKill = false;
        this.beAttack = false;
        this.target = null;
        
        this.fsm.changeState(stateType.idleState);
        this.currentState = stateType.idleState;
    }

	/**添加纹理 初始化数据*/
    public addTexture(tietu:string){
        //获取贴图
        const data = RES.getRes(tietu+"json");
        const texture = RES.getRes(tietu+"png");
        const mcf: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data,texture);
        this.view.movieClipData = mcf.generateMovieClipData(tietu);
        //this.view.anchorX = 0.5;
        this.view.x = this.view.width / 2;
        //描点位置
        // this.anchorX = 0.5;
        // this.anchorY = 0.9;
        //血条位置
        this.lifeBar.x = (this.view.width-this.lifeBar.width)/2;
        this.lifeBar.y = -5;
        
        //初始不会变化的数值数据
        this.offy = 10;
        this.fireDelay = 1000;
	}

    /**初始化 运动路径点*/
    public init(arr:any[],life:number,speed:number,damage:number,value:number):void {
        if (!arr.length) {
            return;
        }
        //属性
        this.hp = this.life = life;
        this.maxSpeed = speed;
        this.damage = damage;
        this.value = value;
        //路径
        this.position.x = this.x = arr[0][0];
        this.position.y = this.y = arr[0][1];
        
        let i:number = 1;
        const len:number = arr.length;
        let v2d: Vector2D;
        //X坐标随机错开
        const offy: number = Math.round(10 - Math.random() * 20);//Y坐标随机错开
        for(i;i < arr.length;i++){
            v2d = new Vector2D(arr[i][0],arr[i][1]+offy);
            this.positionArr.push(v2d);
        }
        
        this.fsm.changeState(stateType.moveState);
    }
    
    /**帧事件*/
    public onEnterFrame(advancedTime: number) {
        super.onEnterFrame(advancedTime);
    }
}