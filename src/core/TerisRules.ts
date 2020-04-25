import { Point, Shape, MoveDirection } from "./types";
import GameConfig from "./GameConfig";
import { SquareGroup } from "./SquareGroup";
import { Square } from "./Square";

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
    static canIMove(shape: Shape, targetPoint: Point,exists:Square[]): boolean {
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
        // 是否与已经有的方块重叠
        targetSquarePoints.some(p=>
            bool = exists.some(sq=> sq.point.x === p.x && sq.point.y === p.y)
        )
        if(bool){
            // 存在已经重叠的方块
            return false;
        }
        return true;
    }



    /**
     * 移动到某个位置
     * 函数重载
     */
    static move(teris:SquareGroup,targetPoint:Point,exists:Square[]):boolean;
    static move(teris:SquareGroup,direction:MoveDirection,exists:Square[]):boolean;
    static move(teris: SquareGroup, targetPointOrDirection: Point | MoveDirection,exists:Square[]):boolean {
        if (isPoint(targetPointOrDirection)) {
            // 如果能够移动，重新设置中心点的坐标
            if (this.canIMove(teris.shape, targetPointOrDirection,exists)) {
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
            return this.move(teris,targetPoint,exists)
        }



    }
    /**
     * 将方块直接移动到该方向的终点
     * @param teris 
     * @param direction 
     */
    static moveDirectly(teris:SquareGroup,direction:MoveDirection,exists:Square[]){
        while(true){
            // 如果移动不成功，退出循环
            if(!this.move(teris,direction,exists)){
                break;
            }
        }
    }
    /**
     * 旋转的规则
     */
    static rotate(teris:SquareGroup,exists:Square[]):boolean{
        // 得到旋转之后新的形状
        const newShape = teris.afterRotateShape();
        if(this.canIMove(newShape,teris.centerPoint,exists)){
            // 能够旋转
            teris.rotate();
            return true;
        }else{
            // 不能够旋转
            return false;
        }
    }

    /**
     * 根据ｙ坐标，获取该行所有的方块
     * @param exists 
     * @param y 
     */
    private static getLineSquares(exists:Square[],y:number){
        return exists.filter(sq=>sq.point.y === y)
    }
    /**
     * 从已存在的方块中消除，并返回消除的行数
     * @param exists 
     */
    static deleteSquares(exists:Square[]):number{
        // １．　获得ｙ坐标数组
        const ys = exists.map(sq=>sq.point.y);
        // 2. 获取最大和最小的ｙ坐标
        const maxY = Math.max(...ys)
        const minY = Math.min(...ys);
        console.log(`max:${maxY},min:${minY}`)
        // 3. 循环判断每一行是否可以消除
        let num = 0;
        for(let y = minY;y <= maxY;y++){
            // this.deleteLine(exists,y)
            if(this.deleteLine(exists,y)){
                num ++;
            }
        }
        return num;
    }
    /**
     * 消除一行
     * @param exists 现有的小方块
     * @param y 行号
     */
    private static deleteLine(exists:Square[],y:number):boolean{
         // 得到这一行所有的方块
         const squares = this.getLineSquares(exists,y)
         // 判断方块的数量是否等于面板的宽度
         if(squares.length === GameConfig.panelSize.width){
             // 这一行可以消除
             squares.forEach(sq=>{
                //  1.从界面移除
                 if(sq.viewer){
                     sq.viewer.remove();
                 }
               
                // 3. 从数组中移除
                const index = exists.indexOf(sq);
                 console.log(index)
                exists.splice(index,1)
             })
              //  2. y行之上的小方块下移(这个地方有些小问题)
              exists.filter(sq=>sq.point.y < y).forEach(sq=>{
                sq.point = {
                    x:sq.point.x,
                    y:sq.point.y + 1
                }
            })
             return true;
         }
         return false;
    }


}

// TerisRule.canIMove();