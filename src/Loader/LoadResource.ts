/**
 * 加载资源类
 */

class LoadResource extends egret.DisplayObjectContainer {
    // 场景资源加载条（总）
    private loadBar: LoadBar;


    public constructor() {
        super();
    }

    public async init() {
        // 官方文档-资源加载顺序控制：http://developer.egret.com/cn/apidoc/index/name/RES.globalFunction#loadGroup
        try {
            egret.ImageLoader.crossOrigin = 'anonymous';
            await RES.loadConfig("default.res.json", "resource/");
            await this.loadTheme();
            await RES.loadGroup("loading", 2);

            // 打开游戏的资源加载界面，加载欢迎页资源
            const loadingView = new LoadingUI();
            this.addChild(loadingView);
            await this.loadGroup("welcomeload", 0, loadingView);
            this.removeChild(loadingView);

            this.loadBar = new LoadBar();
            this.loadBar.addEventListener(MainEvent.StartLoadBar, this.startLoadBar, this);
            this.loadBar.addEventListener(MainEvent.LoadAnimateComplete, this.hideLoadBar, this);
        }
        catch (e) {
            console.error(e);
        }
    }

    public async loadGroup(resGroupName: string, priority :number = 0, loadingView? : RES.PromiseTaskReporter) {
        if (loadingView) {
            await RES.loadGroup(resGroupName, priority, loadingView);
        } else {
            await RES.loadGroup(resGroupName, priority);
        }
    }

    // 场景资源加载条--开始加载--展开
    public async showLoadBar(resGroupName: string) {
        this.addChild(this.loadBar);
        this.loadBar.showLoadBar(resGroupName);
    }
  
    // 场景资源加载条--结束加载--收起
    private hideLoadBar():void {
        this.removeChild(this.loadBar);
    }

    // 开始加载资源
    private async startLoadBar(e:MainEvent) {
        await this.loadGroup(e.resName, 0, this.loadBar);
        // 资源加载完毕后，触发动画
        this.loadBar.hideLoader();
    }


    // 加载皮肤配置
    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);
        })
    }
    

    

}