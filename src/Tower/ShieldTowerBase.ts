/**
 * 盾塔基类--士兵小队
 */

class ShieldTowerBase extends TowerFoundation {

    /**音效资源*/
    protected voiceArr: string[] = ["shield_ready1","shield_ready2","shield_ready3"];


    public constructor() {
        super();
        //播放音效
        const idx = Math.floor(Math.random() * 3);
        //SoundManager.playEffect(this.voiceArr[idx]);
    }
}