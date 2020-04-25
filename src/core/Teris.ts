/**
 * 定义形状
 */
import { Shape, Point } from "./types";
import { getRandom } from "./util";
import { SquareGroup } from "./SquareGroup";
const TShapeArr:Shape = [
    {x:-1,y:0},
    {x:0,y:0},
    {x:1,y:0},
    {x:0,y:-1}
]
const LShapeArr:Shape = [
    {x:-1,y:0},
    {x:-2,y:0},
    {x:0,y:0},
    {x:0,y:-1}
]
const LMirrorShapeArr:Shape = [
    {x:2,y:0},
    {x:1,y:0},
    {x:0,y:0},
    {x:0,y:-1}
]
// S
const SShapeArr:Shape = [
    {x:0,y:0},
    {x:1,y:0},
    {x:0,y:1},
    {x:-1,y:1}
]
const SMirrorShapeArr:Shape = [
    {x:0,y:0},
    {x:-1,y:0},
    {x:0,y:1},
    {x:1,y:1}
]
const SquareShapeArr:Shape = [
    {x:0,y:0},
    {x:1,y:0},
    {x:0,y:1},
    {x:1,y:1}
]
const LineShapeArr:Shape = [
    {x:-1,y:0},
    {x:0,y:0},
    {x:1,y:0},
    {x:2,y:0}
]
/**
 * T型俄罗斯方块
 */
export class TShape extends SquareGroup {
    // 重写父类构造函数
    constructor(
         _centerPoint:Point,
         _color:string
    ){
        super(TShapeArr,_centerPoint,_color);
    }
}
/**
 * L型俄罗斯方块
 */
export class LShape extends SquareGroup {
    // 重写父类构造函数
    constructor(
         _centerPoint:Point,
         _color:string
    ){
        super(LShapeArr,_centerPoint,_color);
    }
}
/**
 * 反方向Ｌ型俄罗斯方块
 */
export class LMirrorShape extends SquareGroup {
    // 重写父类构造函数
    constructor(
         _centerPoint:Point,
         _color:string
    ){
        super(LMirrorShapeArr,_centerPoint,_color);
    }
}
/**
 * 反向Ｓ型俄罗斯方块
 */
export class SMirrorShape extends SquareGroup {
    // 重写父类构造函数
    constructor(
         _centerPoint:Point,
         _color:string
    ){
        super(SMirrorShapeArr,_centerPoint,_color);
    }

     // 重写父类的旋转函数
     rotate(){
        // 调用父类函数
        super.rotate();
        this.isClock = !this.isClock;
    }
}
/**
 * S型俄罗斯方块
 */
export class SShape extends SquareGroup {
    // 重写父类构造函数
    constructor(
         _centerPoint:Point,
         _color:string
    ){
        super(SShapeArr,_centerPoint,_color);
        //只能有两种状态
    }
    // 重写父类的旋转函数
    rotate(){
        // 调用父类函数
        super.rotate();
        this.isClock = !this.isClock;
    }
}
/**
 * 四方型俄罗斯方块
 * 不旋转
 */
export class SquareShape extends SquareGroup {
    // 重写父类构造函数
    constructor(
         _centerPoint:Point,
         _color:string
    ){
        super(SquareShapeArr,_centerPoint,_color);
    }
    afterRotateShape(){
        return this.shape;
    }
}
/**
 * 线型俄罗斯方块
 */
export class LineShape extends SquareGroup {
    // 重写父类构造函数
    constructor(
         _centerPoint:Point,
         _color:string
    ){
        super(LineShapeArr,_centerPoint,_color);
    }
     // 重写父类的旋转函数
     rotate(){
        // 调用父类函数
        super.rotate();
        this.isClock = !this.isClock;
    }
}
/**
 * 形状数组
 */
export const shapes = [
    TShape,
    LShape,
    LMirrorShape,
    SMirrorShape,
    SShape,
    SquareShape,
    LineShape
]
/**
 * 随机颜色
 */
export const colors = [
    "red",
    "#fff",
    "green",
    "orange",
    "pink",
    "#ddd"
]
/**
 * 随机产生俄罗斯方块
 * 颜色随机
 * 形状随机
 * @param centerPoint 中心点
 */
export function createTeris(centerPoint:Point):SquareGroup{
    // 获取随机形状
    let index = getRandom(0,shapes.length);
    const shape = shapes[index];
    // 获取随机颜色
    index = getRandom(0,colors.length);
    const color = colors[index]
    return new shape(centerPoint,color)
}