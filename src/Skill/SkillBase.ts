/**
 * 玩家技能基类
 */

class SkillBase extends eui.Component {
    // 外面框架
    protected uiskilliframe: eui.Image;
    // 技能图片
    protected skill: eui.Image;
    // 蒙层图片
    protected mb: eui.Image;
    // 技能图片类型资源名称--cd中
    protected skillOffResName: string;
    // 技能图片类型资源名称--cd结束
    protected skillOnResName: string;
    // 累计时间
    protected sumtime: number = 0;
    // 技能cd 时间
    public cdtime: number = 0;
    // 技能cd中
    protected iscd: boolean = true;
    /** 添加子类的层，外部场景中的对象层，放置武器，武器层在关卡场景里统一管理，故需要这个对象 */
    protected parentContentLayer: egret.DisplayObjectContainer;

    constructor() {
        super();
        this.skinName= "resource/skins/skill.exml";
    }

    public default() {
        this.skill.source = RES.getRes(this.skillOffResName);
        this.touchEnabled = true;
    }

    public onCreate(): void {
        this.iscd = true;
        this.sumtime = 0;
    }

    public onDestroy(): void {}

    public onEnterFrame(timeStamp:number) {
        if (this.iscd) {
            this.sumtime += timeStamp;
            // per 剩余cd
            let per = 1 - (this.sumtime / this.cdtime);
            this.setMbHeight(this.skill.height * per);
            if (per <= 0) {
                this.iscd = false;
                this.skill.source = RES.getRes(this.skillOnResName);
                this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchHandle,this);
            }
        }
    }


    /**设置蒙层图片高度，模拟cd进度状态 */
    protected setMbHeight(num: number) {
        this.mb.height = num;
    }

    /**释放技能，状态还原 */
    public releaseSkills(arr: number[]) {
        this.skill.source = RES.getRes(this.skillOffResName);
        this.setMbHeight(this.skill.height);
        this.sumtime = 0;
        this.iscd = true;
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchHandle,this);
    }
    
    /**点击了技能 */
    protected touchHandle(e: egret.TouchEvent) {
        Group.selectItem(this);
    }

    public reselectItem() {}
    
    /**选择了技能后，遍历关卡的显示对象，此时士兵不可触摸（原先点击士兵后是可移动的，所以要禁止） */
    public selectItem() {
        this.uiskilliframe.source = RES.getRes('uiskillon');
        GuankaBase.instance.objArr.map(obj => {
            // 如果是士兵
            if (egret.getQualifiedSuperclassName(obj) === "ShieldSoldierBase") {
                obj.view.touchEnabled = false;
            }
        });
    }
    /** 选择了技能A后，再次选择某个对象后，会触发这个方法， A.deselectItem()，技能选择状态取消 */
    public deselectItem() {
        this.uiskilliframe.source = RES.getRes('uiskilloff');
        GuankaBase.instance.objArr.map(obj => {
            // 如果是士兵
            if (egret.getQualifiedSuperclassName(obj) === "ShieldSoldierBase") {
                obj.view.touchEnabled = true;
            }
        });
    }
    
}