import { Game } from "./core/Game";
import { GamePageViewer } from "./core/viewer/GamePageViewer";
import $ from "jquery"
const g = new Game(new GamePageViewer());
g.start()
$("#moveToDown").click(function(){
    g.control_left()
})
$("#remove").click(function(){
    g.control_right();
})
$("#add").click(function(){
    g.control_down()
})
$("#romate").click(function(){
    g.control_rotate()
})