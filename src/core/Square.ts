import { Point, IViewer } from "./types";

/**
 * 小方块类
 */
export class Square{
    private _point :Point = {x:0,y:0}
    private _color:string = "#000"
    // 属性：显示者，可选
    private _viewer?:IViewer

    public get viewer(){
        return this._viewer;
    }
    public set viewer(val){
        this._viewer = val;
        // 如果显示者有值，就手动调用一次
        if(val){
            val.show()
        }

    }
    public get point(){
        return this._point;
    }
    public set point(val){
        this._point = val;
        // 完成显示
        if(this._viewer){
            // 调用显示者的显示方法
            // 显示者怎么显示，那就是显示者类的工作了
            this._viewer.show()
        }   
    }
    // 颜色不能变化，只写get就可以达到这个效果
    public get color (){
        return this._color;
    }
    public set color(val){
        this._color = val
    }


}
