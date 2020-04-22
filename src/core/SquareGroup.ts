import { Square } from "./Square";
import { Point, Shape } from "./types";
export class SquareGroup {
    // 小方块在运动的过程中是不能增加或者减少的
    // 只读的数组 使用范型 或者 readonly Square[]
    private _squares:ReadonlyArray<Square>;
    // 提供接口，供外界访问小方块数组，但不允许外界修改
    public get squares(){
        return this._squares;
    }
    // 抛出形状
    public get shape(){
        return this._shape;
    }
    public get centerPoint():Point{
        return this._centerPoint;
    }

    public set centerPoint (val:Point){
        // 设置中心点的坐标
        this._centerPoint = val;
        // 当中心点坐标发生改变时，更新所有小方块坐标
        this._shape.forEach((p,i)=>{
            // 每个小方块的绝对坐标等于
            // 中心点坐标加上每个小方块的相对坐标
            this.squares[i].point = {
                x:this._centerPoint.x + p.x,
                y:this._centerPoint.y + p.y
            }
       })
    }
    /**
     * 
     * @param shape 形状
     * @param centerPoint 中心点坐标
     * @param color 颜色
     */
    constructor(
        private _shape:Shape,
        private _centerPoint:Point,
        private _color:string){
            /**
             * 设置小方块的数组
            */
        //    本质上是坐标的数组
        const arr:Square[] = [];
           this._shape.forEach(p=>{
               /**
                * 循环形状数组
                * 创建小方块对象，
                * 将创建完成的对象放进一个方块数组里面
                */
                const sq = new Square();
                sq.color = this._color;
                sq.point = {
                    x:this._centerPoint.x + p.x,
                    y:this._centerPoint.y + p.y
                }
                arr.push(sq)
           })
        //    将创建完成的方块数组赋值给this._squares
        // 并提供this.square接口供外界访问
        // 外界可以循环这个数组，给数组中的每一个方块
        // 添加显示者，渲染到页面容器里
           this._squares = arr;
    }
}

/**使用示例
const arr = [
    {x:0,y:-1},
    {x:-1,y:0},
    {x:0,y:0},
    {x:0,y:1}
]
传入形状（小方块坐标数组）
传入中心点坐标
传入颜色
const group = new SquareGroup([...arr],{x:3,y:2},"red")
group.squares.forEach(sq=>{
    sq.viewer = new SquarePageViewer(sq,$("#root"))
})
 */