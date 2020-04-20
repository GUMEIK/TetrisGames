export interface Point {
    // 防止外界进行更改
    readonly x:number
    readonly y:number
}
/**
 * 能够实现该接口的，都是显示者
 */
export interface IViewer {
    // 显示
    show():void
    // 移除掉，不再显示
    remove():void
}