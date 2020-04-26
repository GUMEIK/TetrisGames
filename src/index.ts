import { Game } from "./core/Game";
import { GamePageViewer } from "./core/viewer/GamePageViewer";
import $ from "jquery"
import { GameStatus } from "./core/types";
// 导入css样式
import  './css/index.css'
const g = new Game(new GamePageViewer());
$("#btnRotate").click(()=>{
    g.control_rotate();
})
$("#btnLeft").click(()=>{
    g.control_left();
})
$("#btnDown").click(()=>{
    g.control_down()
})
$("#btnRight").click(()=>{
    g.control_right();
})
$("#blank").click(()=>{
    if(g.gameStatus === GameStatus.playing){
        g.pause()
    }else {
        g.start()
    }
})