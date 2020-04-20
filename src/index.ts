import { Square } from "./core/Square";
import { SquarePageViewer } from "./core/viewer/SquarePageViewer";
import $ from "jquery"
import { SquareGroup } from "./core/SquareGroup";
const arr = [
    {x:0,y:-1},
    {x:-1,y:0},
    {x:0,y:0},
    {x:0,y:1}
]
const group = new SquareGroup([...arr],{x:3,y:2},"red")
group.squares.forEach(sq=>{
    sq.viewer = new SquarePageViewer(sq,$("#root"))
})


$("#moveToDown").click(function(){
//    更改中心点坐标
    group.centerPoint = {
        x:group.centerPoint.x +1 ,
        y:group.centerPoint.y
    }
    console.log(group.centerPoint)
})
// $("#remove").click(function(){
//     sq.viewer && sq.viewer.remove()
// })
// $("#add").click(function(){
//     sq.viewer = new SquarePageViewer(sq,$("#root"))
// })