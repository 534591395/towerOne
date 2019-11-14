/**
 * 技能2 --增援士兵
 */

class Skill2 extends SkillBase {
    public constructor() {
        super();
        
        this.skillOffResName = 'uiskill2off';
        this.skillOnResName = 'uiskill2';
        this.cdtime = 20000;
        this.init();
    }
}