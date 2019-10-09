/**
 * 世界地图类（关卡选择界面）
 */

class World extends eui.Component {
    public constructor() {
        super();
        this.skinName = "resource/skins/world.exml";
        // 播放背景音乐
        SoundManager.playBgSound("mapbgsound");
    }
}