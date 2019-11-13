/**
 * 技能2 --增援士兵
 */

class Skill2 extends SkillBase {
    public constructor() {
        super();
        
        this.skillResName = 'uiskill2';
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        
    }

    public onAddToStage() {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.skill.source = RES.getRes(this.skillResName);
        this.touchEnabled = true;
    }
}