/**
 * 防御塔级别配置文件
 * 
 * 相关图片资源纹理集路径：resource\assets\game\build\buildTool.json
 */

class TowerLevel {

    public static data: any = {
        // 箭塔
        "ArrowTower01": {"className":"ArrowTower01","res":"gj01","price":60},
        // 盾塔--士兵小队
        "ShieldTower01": {"className":"ShieldTower01","res":"dp01","price":70},
        // 魔法塔
        "MagicTower01": {"className":"MagicTower01","res":"mf01","price":100},
        // 炮塔（爆炸）
        "ExplodeTower01": {"className":"ExplodeTower01","res":"zd01","price":125}
    }
}