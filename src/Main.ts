/**
 * 游戏入口类
 */

class Main extends eui.UILayer {

    // 游戏场景容器
    private gameLayer:egret.DisplayObjectContainer;

    private loadBar: LoadBar;

    private loadResource: LoadResource;
    
    /**场景堆栈*/
    private views: any[] = [];

    protected createChildren(): void {
        super.createChildren();

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        
        // 资源类
        this.loadResource = new LoadResource();
        this.addChild(this.loadResource);

        this.runGame().catch(e => {
            console.log(e);
        })
    }

    private async runGame() {
        await this.loadResource.init();
        this.createGameScene();
        //const result = await RES.getResAsync("description_json")
        // await platform.login();
        // const userInfo = await platform.getUserInfo();
        // console.log(userInfo);
    }


    private textfield: egret.TextField;
    /**
     * 创建场景界面
     * Create scene interface
     */
    protected createGameScene(): void {
       this.gameLayer = new egret.DisplayObjectContainer();
       this.addChild(this.gameLayer);

       // 加载欢迎背景页 
       const bg = new Bg();
       this.gameLayer.addChild(bg);
       this.views.push(bg);

       bg.addEventListener(MainEvent.GameStart, this.index, this);
    }
    
    // 点击开始游戏后，进入游戏主页
    private index() {
        const run = new Run();
        const bg = this.gameLayer.getChildAt(0);
        if (bg) {
            bg.removeEventListener(MainEvent.GameStart, this.index, this);
        }
        this.gameLayer.removeChildAt(0);
        this.views.shift();

        this.gameLayer.addChild(run);
        this.views.push(run);
        
        // 监听进入场景加载进度条
        run.addEventListener(MainEvent.OpenLoadBar, this.createLoadBar, this);
    }

    // 场景加载进度条
    private async createLoadBar(e:MainEvent) {
        console.log('加载场景', e.resName);
        const run = this.gameLayer.getChildAt(0);
        if (run) {
            run.removeEventListener(MainEvent.OpenLoadBar, this.createLoadBar, this);
        }
        const view = this.views.shift();
        view.destroy();

        await this.loadResource.showLoadBar(e.resName);
    }

}
