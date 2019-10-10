/**
 * 游戏入口类
 * 
 * 
 * iphonex 图片适配大小：横屏尺寸：2436px × 1125px(812pt × 375pt @3x)
 */

class Main extends eui.UILayer {

    // 游戏场景容器
    private gameLayer:egret.DisplayObjectContainer;

    // 资源加载类
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

        this.loadResource.addEventListener(MainEvent.LoadAnimateComplete, this.addSence, this);

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

    // 根据当前加载的场景资源组名，添加相应场景，引导界面除外
    private addSence(e:MainEvent) {
        const sceneName: any = {
            "maps": "World"
        };
        // 获取对象名称
        const className = egret.getDefinitionByName(sceneName[e.resName]);
        const obj = new className();
        this.gameLayer.addChild(obj);
        this.views.push(obj);
    }

}
