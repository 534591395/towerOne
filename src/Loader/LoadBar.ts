/**
 * 场景资源加载进度条
 */

class LoadBar extends eui.Component implements RES.PromiseTaskReporter {
    public constructor() {
        super();
        this.skinName = "resource/skins/loadbar.exml";
    }

    public onProgress(current: number, total: number): void {
        //this.textField.text = `Loading...${current}/${total}`;
        //this.loading.width = (current/total) * 428;
    }
}