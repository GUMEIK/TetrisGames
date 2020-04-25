import { SquareGroup } from "./SquareGroup";
import { Game } from "./Game";

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
/**
 * 俄罗斯方块的形状
 * 本质是多个小方块的坐标数组
 */

 export type Shape = Point[]
//  移动方向
export enum MoveDirection {
    left,
    right,
    down
}

// 游戏的状态
export enum GameStatus {
    init,//未开始
    playing,
    pause,
    over
}
export interface GameViewer{
    /**
     * 
     * @param teris 下一个方块对象
     */
    showNext(teris:SquareGroup):void;
    /**
     * 
     * @param teris 切换的方块对象
     */
    switch(teris:SquareGroup):void;
    /**
     * 完成界面初始化
     */
    init(game:Game):void;
    showScore(score:number):void;
    /**
     * 游戏暂停时触发的的事件
     */
    onGamePause():void;
    onGameStart():void;
    onGameOver():void;
}
