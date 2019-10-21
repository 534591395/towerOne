/**
 * 工具类
 */

class Utiles {
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    public static createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    /**
    * 检测是否进入椭圆范围
    * @param px             被检测点x坐标
    * @param py             被检测点y坐标
    * @param cx             椭圆圆心x坐标
    * @param cy             椭圆圆心y坐标
    * @param r              椭圆最大半径
    * @param sy             将圆沿y轴压扁变为椭圆时候的比例
    * @return               是否包含在椭圆中
    */
    public static containsXY(px:number, py:number, cx:number, cy:number, r:number, sy:number = 0.5):boolean{
        let dx:number = px-cx;
        let dy:number = py-cy;
        dy /= sy;
        if(Math.sqrt(dx * dx + dy * dy)<r){
            return true;
        }
        return false;
    }

    /*
    * 对象冒泡排序
    */ 
    public static sortarr(arr:any[]):any[]{
        let tmp:any;
        for (let i:number = 0; i < arr.length; i++){
            for (let j:number = arr.length - 1; j > i; j--){
                if (arr[j].y < arr[j - 1].y){
                    tmp = arr[j];
                    arr[j] = arr[j - 1];
                    arr[j - 1] = tmp;
                }
            }
        }
        return arr;
    }
}