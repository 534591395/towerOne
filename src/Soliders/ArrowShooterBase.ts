/**
 * 弓箭手基类
 */

class ArrowShooterBase extends egret.MovieClip {
    // 开始标签
    protected startLabel: string;
    // 结束标签
    protected endLabel: string;
    // 闲置等待标签
    protected idleLabel: string; 

    public constructor() {
        super();
        
    }

    // 帧率执行回调
    public onEnterFrame() {
        // 当前播放帧标签是结束标签，结束动画帧播放
        if (this.currentLabel === this.endLabel) {
            this.gotoAndStop(this.idleLabel);
        }
    }

    // 播放发射动画帧: direct 发射方向
    public file(direct): void {
        switch(direct) {
            case "downRight":
                this.startLabel = "shootDown";
                this.endLabel= "shootDownEnd";
                this.idleLabel = "idleDown";
                this.scaleX = 1;
                break;
            case "upRight": 
                this.startLabel = "shootUp";
                this.endLabel= "shootUpEnd";
                this.idleLabel = "idleUp";
                this.scaleX = 1;
                break;
            case "downLeft":
                this.startLabel = "shootDown";
                this.endLabel= "shootDownEnd";
                this.idleLabel = "idleDown";
                this.scaleX = -1;
                break;
            case "upLeft":
                this.startLabel = "shootUp";
                this.endLabel= "shootUpEnd";
                this.idleLabel = "idleUp";
                this.scaleX = -1;
                break;
        }
        this.gotoAndPlay(this.startLabel);
    }
}