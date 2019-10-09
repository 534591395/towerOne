/**
 *  打开游戏的资源加载界面UI
 */

class LoadingUI extends eui.Component implements RES.PromiseTaskReporter {
    private loading: eui.Image; 

    public constructor() {
        super();
        this.skinName = "resource/skins/loading.exml";
    }


    public onProgress(current: number, total: number): void {
        this.loading.width = (current/total) * 428;
    }
}
