export interface Point {
    // 防止外界进行更改
    readonly x:number
    readonly y:number
}
export interface IViewer {
    // 显示
    show():void
    // 移除掉，不再显示
    remove():void
}