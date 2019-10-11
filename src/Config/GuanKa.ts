/**
 * 关卡配置数据
 */

class GuanKa {
    // 每个关卡的资源组名
    public static resourceNameArr: string[] = ["guanka01"];

    // 关卡状态
    public static data: any[] = [
        {"ispass": false, "wujin": false, name: "flag01", wujinMaxRound: 0}
    ];

    // 获取关卡状态
    public static getData():any[] {
        return GuanKa.data;
    }
}