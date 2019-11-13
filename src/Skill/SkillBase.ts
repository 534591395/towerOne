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

    protected skillResName: string;

    constructor() {
        super();
        this.skinName= "resource/skins/skill.exml";

        this.skill.source = RES.getRes(this.skillResName);
        this.touchEnabled = true;
    }
}