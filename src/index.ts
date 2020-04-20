import { Square } from "./core/Square";
import { IViewer } from "./core/types";
// 控制显示的类，方块的控制台显示类
class SquareConsoleViewer implements IViewer{
    constructor(
        private square:Square
    ){

    }
    // 怎么显示
    show():void{
        console.log("小方块显示啦")
        console.log(this.square.point,this.square.color)
    }
    // 怎么移除
    remove():void{

    }
}

const sq = new Square({x:2,y:2},"red");
sq.viewer = new SquareConsoleViewer(sq);
// 初始化显示
sq.viewer.show()
sq.point = {
    x:5,
    y:6
}