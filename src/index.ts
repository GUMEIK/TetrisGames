import { Square } from "./core/Square";
import { SquarePageViewer } from "./core/viewer/SquarePageViewer";
import $ from "jquery"
const sq = new Square();
sq.viewer = new SquarePageViewer(sq,$("#root"))
sq.color = "red"
sq.point = {
    x:3,
    y:4
}

$("#moveToDown").click(function(){
    sq.point = {
        x:sq.point.x,
        y:sq.point.y + 1
    }
})
$("#remove").click(function(){
    sq.viewer && sq.viewer.remove()
})
$("#add").click(function(){
    sq.viewer = new SquarePageViewer(sq,$("#root"))
})