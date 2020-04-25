import { Point, Shape, MoveDirection } from "./types";
import GameConfig from "./GameConfig";
import { SquareGroup } from "./SquareGroup";

// 自定义类型保护函数
// 判断传参数是不是坐标
function isPoint(obj: any): obj is Point {//判断参数ｏｂｊ是不是Ｐoint类型
    if (typeof obj.x === "undefined") {
        return false;
    }
    return true;
}
/**
 * 该类提供一些列的函数，根据游戏规则，判断各种情况
 */
export class TerisRule {
    /**
     * 判断某个形状的方块是否能够移动到目标位置
     * @param shape 形状
     * @param targetPoint 目标位置(中心点坐标，如果把这个形状当作中心点坐标)
     */
    static canIMove(shape: Shape, targetPoint: Point): boolean {
        // 假设，中心点已经移动到了目标位置，算出每个小方块的坐标
        const targetSquarePoints: Point[] = shape.map(it => {
            return {
                x: it.x + targetPoint.x,
                y: it.y + targetPoint.y
            }
        })
        // 边界判断
        let bool = targetSquarePoints.some(p => {
            // 是否有超出了边界
            if (p.x < 0 || p.x > GameConfig.panelSize.width - 1 || p.y < 0 || p.y > GameConfig.panelSize.height - 1) {
                return true;
            } else {
                return false;
            }
        })
        if (bool) {
            // 如果超出了边界，则不能够移动
            return false;
        }
        return true;
    }



    /**
     * 移动到某个位置
     * 函数重载
     */
    static move(teris:SquareGroup,targetPoint:Point):boolean;
    static move(teris:SquareGroup,direction:MoveDirection):boolean;
    static move(teris: SquareGroup, targetPointOrDirection: Point | MoveDirection):boolean {
        if (isPoint(targetPointOrDirection)) {
            // 如果能够移动，重新设置中心点的坐标
            if (this.canIMove(teris.shape, targetPointOrDirection)) {
                teris.centerPoint = targetPointOrDirection
                // 移动成功
                return true;
            }
            // 移动失败
            return false;
        } else {
            // 传进来的是方向
            const direction = targetPointOrDirection;
            let targetPoint:Point;
            if(direction === MoveDirection.down){
                targetPoint = {
                    x:teris.centerPoint.x,
                    y:teris.centerPoint.y + 1
                }
            }else if(direction === MoveDirection.left){
                targetPoint = {
                    x:teris.centerPoint.x - 1,
                    y:teris.centerPoint.y 
                }
            }else{
                targetPoint = {
                    x:teris.centerPoint.x + 1,
                    y:teris.centerPoint.y
                }
            }
            // 递归调用
            return this.move(teris,targetPoint)
        }



    }
    /**
     * 将方块直接移动到该方向的终点
     * @param teris 
     * @param direction 
     */
    static moveDirectly(teris:SquareGroup,direction:MoveDirection){
        while(true){
            // 如果移动不成功，退出循环
            if(!this.move(teris,direction)){
                break;
            }
        }
    }
    /**
     * 旋转的规则
     */
    static rotate(teris:SquareGroup):boolean{
        // 得到旋转之后新的形状
        const newShape = teris.afterRotateShape();
        if(this.canIMove(newShape,teris.centerPoint)){
            // 能够旋转
            teris.rotate();
            return true;
        }else{
            // 不能够旋转
            return false;
        }
    }

}

// TerisRule.canIMove();