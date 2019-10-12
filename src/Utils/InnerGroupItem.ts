/**
 * 约定某个元素的选择状态操作
 */

interface InnerGroupItem {
    // 选择
    selectItem(): void;
    // 取消
    deselectItem(): void;
    // 重置
    reselectItem(): void;
}