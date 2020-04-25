import { GameViewer } from "../types";
import { SquarePageViewer } from "./SquarePageViewer";
import $ from "jquery"
export class GamePageViewer implements GameViewer{
    /**
     * ESNext 语法，动态导入
     * @param teris 
     */
    showNext(teris: import("../SquareGroup").SquareGroup): void {
        teris.squares.forEach(sq=>{
            sq.viewer = new SquarePageViewer(sq,$("#next"))
        })
    }
    switch(teris: import("../SquareGroup").SquareGroup): void {
        teris.squares.forEach(sq=>{
            // 这个感叹号！
            sq.viewer!.remove()
            sq.viewer = new SquarePageViewer(sq,$("#panel"))
        })
    }
    
}