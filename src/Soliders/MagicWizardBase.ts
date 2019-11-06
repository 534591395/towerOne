/**
 * 魔法师基类
 */

class MagicWizardBase extends egret.MovieClip {
    // 开始标签
    protected stateLabel: string;
    // 闲置等待标签
    protected idleLabel: string; 

    public constructor() {
        super();
    }

    // 帧率执行回调
    public onEnterFrame(timeStamp? :number) {
        this.checkLastEnd(this.stateLabel, this.currentFrame);
    }

    // 播放发射动画帧: direct 发射方向
    public fire(direct: string): void {
        switch(direct) {
            case "down": 
                this.stateLabel = "shoot_down";
                this.idleLabel = "idleDown";
                break;
            case "up":
                this.stateLabel = "shoot_up";
                this.idleLabel = "idleUp";
                break;    
        }
        this.gotoAndPlay(this.stateLabel);
    }

    /**
     * 播放结束检查
     */
    protected checkLastEnd(str:string, currentFrame: number) {
        const nextFrameNum:number = currentFrame+1;
        const movieClipData = this.movieClipData;
        const mz: string = Utiles.getFrameLable(movieClipData, nextFrameNum);
        if( mz != str ||  currentFrame >= this.totalFrames) {
            // 动画状态改为闲置状态, 将播放头移到指定帧并停止
            this.gotoAndStop(this.idleLabel);
        }
    }
}