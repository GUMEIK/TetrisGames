/**
 * 定义形状
 */
import { Shape, Point } from "./types";
import { getRandom } from "./util";
import { SquareGroup } from "./SquareGroup";

// T
export const TShape:Shape = [
    {x:-1,y:0},
    {x:0,y:0},
    {x:1,y:0},
    {x:0,y:-1}
]
// L
export const LShape:Shape = [
    {x:-1,y:0},
    {x:-2,y:0},
    {x:0,y:0},
    {x:0,y:-1}
]
// 反向 Ｌ
export const LMirrorShape:Shape = [
    {x:2,y:0},
    {x:1,y:0},
    {x:0,y:0},
    {x:0,y:-1}
]
// S
export const SShape:Shape = [
    {x:0,y:0},
    {x:1,y:0},
    {x:0,y:1},
    {x:-1,y:1}
]
// 反向S
export const SMirrorShape:Shape = [
    {x:0,y:0},
    {x:-1,y:0},
    {x:0,y:1},
    {x:1,y:1}
]
// 四方块
export const SquareShape:Shape = [
    {x:0,y:0},
    {x:1,y:0},
    {x:0,y:1},
    {x:1,y:1}
]
// 长条
export const LineShape:Shape = [
    {x:-1,y:0},
    {x:0,y:0},
    {x:1,y:0},
    {x:2,y:0}
]

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
    "orange"
]
/**
 * 随机产生俄罗斯方块
 * 颜色随机
 * 形状随机
 * @param centerPoint 中心点
 */
export function createTeris(centerPoint:Point){
    // 获取随机形状
    let index = getRandom(0,shapes.length);
    const shape = shapes[index];
    // 获取随机颜色
    index = getRandom(0,colors.length);
    const color = colors[index]
    return new SquareGroup(shape,centerPoint,color)
}