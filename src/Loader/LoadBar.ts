/**
 * 场景资源加载进度条
 */

class LoadBar extends eui.Component implements RES.PromiseTaskReporter {
    private leftGroup: eui.Group;
    private rightGroup: eui.Group;
    private loadLeftGroup: eui.Group;
    private loadRightGroup: eui.Group;
    private barleft: eui.Image;
    private barRight: eui.Image;

    public constructor() {
        super();
        this.skinName = "resource/skins/loadbar.exml";
        // 给左右多余的加载条上添加蒙层隐藏起来
        this.loadLeftGroup.mask = new egret.Rectangle(0,0,99,36);
        this.loadRightGroup.mask = new egret.Rectangle(99,0,99,36);
    }
    

    public onProgress(current: number, total: number): void {
        this.barleft.width = (current/total) * 182;
        this.barRight.width = (current/total) * 182;
    }

    // 开始加载，合拢动画
    // resGroupName 要加载的资源组名称
    public showLoadBar(resGroupName: string):void {
        TweenMax.to(this.leftGroup, 0.3, { x: 0, ease: Cubic.easeOut });
        TweenMax.to(this.rightGroup, 0.3, { x: 400, ease: Cubic.easeOut, onComplete: () => {
            // 触发加载
            this.dispatchEvent(new MainEvent(MainEvent.StartLoadBar, resGroupName));
        } });
        // 播放合拢音效
        SoundManager.playEffect("loaderClose"); 
    }

    // 加载完毕，展开动画
    public hideLoader(resGroupName: string):void {
        TweenMax.to(this.leftGroup, 0.3, {delay: 0.6, x: -400, ease: Cubic.easeOut});
        TweenMax.to(this.rightGroup, 0.3, {delay: 0.6, x: 800, ease: Cubic.easeOut, onComplete: () => {
            // 加载完毕后，展开动画结束
            this.dispatchEvent(new MainEvent(MainEvent.LoadAnimateComplete, resGroupName));
        } });
        // 播放展开音效
        SoundManager.playEffect("loaderOpen");
    }
}