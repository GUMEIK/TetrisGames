import { Square } from "./core/Square";
import { SquarePageViewer } from "./core/viewer/SquarePageViewer";
import $ from "jquery"
import { SquareGroup } from "./core/SquareGroup";
import { LShape, TShape, LineShape, createTeris } from "./core/Teris";
import { TerisRule } from "./core/TerisRules";
import { MoveDirection } from "./core/types";
const arr = [
    {x:0,y:-1},
    {x:-1,y:0},
    {x:0,y:0},
    {x:0,y:1}
]
// const group = new SquareGroup( LineShape,{x:3,y:2},"red")
const teris = createTeris({x:3,y:2})
teris.squares.forEach(sq=>{
    sq.viewer = new SquarePageViewer(sq,$("#root"))
})
// 旋转
$("#romate").click(function () {
    // let p = teris.rotate()
    // console.log(p)
    TerisRule.rotate(teris)
})

$("#moveToDown").click(function(){
//    更改中心点坐标
    const targetPoint = {
        x:teris.centerPoint.x +1 ,
        y:teris.centerPoint.y
    }
    // if(TerisRule.canIMove(teris.shape,targetPoint)){
    //     teris.centerPoint = {
    //         x:teris.centerPoint.x +1 ,
    //         y:teris.centerPoint.y
    //     }
    // }
   TerisRule.moveDirectly(teris,MoveDirection.left)
    // console.log(teris.centerPoint)
})
// $("#remove").click(function(){
//     sq.viewer && sq.viewer.remove()
// })
// $("#add").click(function(){
//     sq.viewer = new SquarePageViewer(sq,$("#root"))
// })