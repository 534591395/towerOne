/**
 *
 * 节点类
 * 参考第三方代码
 *
 */
class NodePoint {
    public x:number;
    public y:number;
    public walkable:boolean = true;
    public constructor(x:number, y:number) {
        this.x = x;
        this.y = y;
    }
}
