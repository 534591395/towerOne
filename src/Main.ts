//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends eui.UILayer {

    // 游戏场景容器
    private gameLayer:egret.DisplayObjectContainer;

    private loadBar: LoadBar;

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


        this.runGame().catch(e => {
            console.log(e);
        })
    }

    private async runGame() {
        await this.loadResource()
        this.createGameScene();
        //const result = await RES.getResAsync("description_json")
        await platform.login();
        const userInfo = await platform.getUserInfo();
        console.log(userInfo);

    }

    private async loadResource() {
        // 官方文档-资源加载顺序控制：http://developer.egret.com/cn/apidoc/index/name/RES.globalFunction#loadGroup
        try {
            egret.ImageLoader.crossOrigin = 'anonymous';
            await RES.loadConfig("default.res.json", "resource/");
            //await RES.loadConfig("default.res.json", "https://wxgame.dreamrabbit.tech/game/resource/");
            await this.loadTheme();
            await RES.loadGroup("loading", 2);
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadGroup("preload", 1, loadingView);
            await RES.loadGroup("welcomeload", 0, loadingView);
            
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

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
        this.gameLayer.addChild(run);
        
        // 监听进入场景加载进度条
        run.addEventListener(MainEvent.OpenLoadBar, this.createLoadBar, this);
    }

    // 场景加载进度条
    private createLoadBar(e:MainEvent) {
        console.log('加载场景', e.resName);
        this.loadBar = new LoadBar();
        this.addChild(this.loadBar);
    }

}
