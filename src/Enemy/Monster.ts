/**
 * 怪物类
 */

class Monster extends MonsterBase {
    public constructor() {
        super();

        this.view = new egret.MovieClip();
        this.addChild(this.view);
    }
}