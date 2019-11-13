/**
 * 技能1- 火球
 */

class Skill1 extends SkillBase {
    public constructor() {
        super();
        
        this.skillResName = 'uiskill1';
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        
    }

    public onAddToStage() {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.skill.source = RES.getRes(this.skillResName);
        this.touchEnabled = true;
    }
}