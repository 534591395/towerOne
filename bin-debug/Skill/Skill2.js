/**
 * 技能2 --增援士兵
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Skill2 = (function (_super) {
    __extends(Skill2, _super);
    function Skill2() {
        var _this = _super.call(this) || this;
        /* 生成的增援士兵集合 */
        _this.soldiers = [];
        /**士兵集合点偏移量- 跟集合点坐标的偏移，防止士兵扎堆在一个点上，默认塔生成两个士兵 */
        _this.offsetArr = [[-10, 0], [10, 10]];
        /**集合点偏移量数组索引*/
        _this.offsetIndex = -1;
        _this.parentContentLayer = GuankaBase.instance.objLayer;
        _this.skillOffResName = 'uiskill2off';
        _this.skillOnResName = 'uiskill2';
        _this.cdtime = 20000;
        _this.default();
        return _this;
    }
    Skill2.prototype.onEnterFrame = function (timeStamp) {
        var _this = this;
        _super.prototype.onEnterFrame.call(this, timeStamp);
        // 进入攻击范围的敌人，没有攻击对象的敌人
        var atargets = [];
        GuankaBase.instance.enemyArr.map(function (item) {
            if (item.target === null) {
                var isIn = Utiles.containsXY2(item.x, item.y, _this.stage.stageWidth, _this.stage.stageHeight);
                var index = atargets.indexOf(item);
                if (isIn && item.hp > 0) {
                    if (index === -1) {
                        atargets.push(item);
                    }
                }
                else {
                    // 已经不在该塔的攻击范围内
                    if (index > -1) {
                        atargets.splice(index, 1);
                    }
                }
            }
        });
        // 下面是赋值给每个
        var soliders = [];
        this.soldiers.map(function (solider) {
            if (solider.hp > 0) {
                soliders.push(solider);
                solider.targets = atargets;
            }
        });
        this.soldiers = soliders;
    };
    /**释放技能 */
    Skill2.prototype.releaseSkills = function (arr) {
        _super.prototype.releaseSkills.call(this, arr);
        //利用对象池创建增援士兵
        this.soldier1 = ObjectPool.getInstance().createObject(Reinforcements1);
        this.soldier2 = ObjectPool.getInstance().createObject(Reinforcements2);
        this.soldier1.life = this.soldier2.life = Math.sqrt(GuankaBase.instance.hardxs) * 20;
        this.soldier1.damage = this.soldier2.damage = Math.sqrt(GuankaBase.instance.hardxs) * 4;
        this.parentContentLayer.addChild(this.soldier1);
        this.parentContentLayer.addChild(this.soldier2);
        this.soldiers.push(this.soldier1);
        this.soldiers.push(this.soldier2);
        GuankaBase.instance.objArr.push(this.soldier1);
        GuankaBase.instance.objArr.push(this.soldier2);
        this.soldier1.xoffset = this.offsetArr[0][0];
        this.soldier1.yoffset = this.offsetArr[0][1];
        this.soldier2.xoffset = this.offsetArr[1][0];
        this.soldier2.yoffset = this.offsetArr[1][1];
        var positionArr = [[arr[0], arr[1]], [arr[0], arr[1]]];
        this.soldier1.init(positionArr);
        this.soldier2.init(positionArr);
    };
    return Skill2;
}(SkillBase));
__reflect(Skill2.prototype, "Skill2");
