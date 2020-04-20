import { Square } from "../Square";
import $ from "jquery"
import { IViewer } from "../types";
import PageConfig from "./PageConfig";
// JQuery<HTMLElement>　　泛型

/**
 * 将方块显示到页面上的类
 */
export class SquarePageViewer implements IViewer{
    private dom?:JQuery<HTMLElement>
    private isRemove:boolean = false//是否已经移除过了
    show(): void {
        if(this.isRemove){
            // 如果方块被移除了，就不用显示了
            return;
        }
        // 如果ｄｏｍ不存在，就创建一个ｊｑ　　ｄｏｍ对象
        if(!this.dom){
            this.dom = $("<div>").css({
                position:"absolute",
                width:PageConfig.SquareSize.width,
                height:PageConfig.SquareSize.height,
                border:PageConfig.SquareSize.border,
                boxSizing:"border-box"
            }).appendTo(this.container)
        }
        this.dom.css({
            // 逻辑坐标与真实坐标转换
            left:this.square.point.x * PageConfig.SquareSize.width,
            top:this.square.point.y * PageConfig.SquareSize.height,
            background:this.square.color
        })
    }
    remove(): void {
        if(this.dom && !this.isRemove){
            // 这里的移除是视觉上看不到了，但实际还在,jquery的ｒｅｍｏｖｅ方法
            this.dom.remove()
            this.isRemove = true;
        }
    }

    constructor(
        // 哪个小方块要显示
        private square:Square,
        // 显示到哪个容器（容器类型为ｄｏｍ对象）
        private container:JQuery<HTMLElement>
    ){
        
    }
}