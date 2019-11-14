/**
 * 技能1- 火球
 */

class Skill1 extends SkillBase {
    public constructor() {
        super();
        
        this.skillOffResName = 'uiskill1off';
        this.skillOnResName = 'uiskill1';
        this.cdtime = 25000;
        this.init();
    }
}