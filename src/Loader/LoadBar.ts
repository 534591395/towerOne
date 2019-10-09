/**
 * 场景资源加载进度条
 */

class LoadBar extends eui.Component implements RES.PromiseTaskReporter {
    private leftGroup: eui.Group;
    private rightGroup: eui.Group;
    private loadLeftGroup: eui.Group;
    private loadRightGroup: eui.Group;

    public constructor() {
        super();
        this.skinName = "resource/skins/loadbar.exml";
        // 给左右多余的加载条上添加蒙层隐藏起来
        this.loadLeftGroup.mask = new egret.Rectangle(0,0,99,36);
        this.loadRightGroup.mask = new egret.Rectangle(99,0,99,36);

        this.showLoadBar();
    }
    

    public onProgress(current: number, total: number): void {
        //this.textField.text = `Loading...${current}/${total}`;
        //this.loading.width = (current/total) * 428;
    }

    // 开始加载，合拢动画
    private showLoadBar() {
        TweenMax.to(this.leftGroup, 0.3, { x: 0, ease: Cubic.easeOut });
        TweenMax.to(this.rightGroup, 0.3, { x: 400, ease: Cubic.easeOut, onComplete: () => {
            setTimeout(() => {
                this.hideLoader();
            }, 1000);
            
        } });
        // 播放合拢音效
        SoundManager.playEffect("loaderClose");
        
    }

    // 加载完毕，展开动画
    private hideLoader() {
        TweenMax.to(this.leftGroup, 0.3, {delay: 0.6, x: -400, ease: Cubic.easeOut});
        TweenMax.to(this.rightGroup, 0.3, {delay: 0.6, x: 800, ease: Cubic.easeOut, onComplete: () => {
            // 播放展开音效
            SoundManager.playEffect("loaderOpen");
        } });
    }
}