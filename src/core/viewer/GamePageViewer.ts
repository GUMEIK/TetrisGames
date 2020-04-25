import { GameViewer, GameStatus } from "../types";
import { SquarePageViewer } from "./SquarePageViewer";
import $ from "jquery"
import GameConfig from "../GameConfig";
import PageConfig from "./PageConfig";
export class GamePageViewer implements GameViewer{
    private nextDom = $("#next");
    private panelDom = $("#panel");
    private scoreDom = $("#score")
    private msgDom = $("#msg")
    onGamePause(): void {
        this.msgDom.css({
            display:"flex"
        });
        this.msgDom.find("p").html("游戏暂停")
    }
    onGameStart(): void {
        this.msgDom.hide();
    }
    onGameOver(): void {
        this.msgDom.css({
            display:"flex"
        });
        this.msgDom.find("p").html("游戏结束")
    }
    showScore(score: number): void {
        // 显示分数
        this.scoreDom.html(score.toString())
    }
 
    // 初始化
    init(game: import("../Game").Game): void {
        // １．设置宽高
        this.panelDom.css({
            // 逻辑宽度，一行有多少个格子
            width:GameConfig.panelSize.width*PageConfig.SquareSize.width,
            height:GameConfig.panelSize.height*PageConfig.SquareSize.height
        })
        this.nextDom.css({
            // 逻辑宽度，一行有多少个格子
            width:GameConfig.nextSize.width*PageConfig.SquareSize.width,
            height:GameConfig.nextSize.height*PageConfig.SquareSize.height
        })
        // 2. 注册键盘事件
        $(document).keydown((e)=>{
            let code = e.keyCode;
            if(code === 37){
                game.control_left()
            }else if(code === 38){
                game.control_rotate()
            }else if(code === 39){
                game.control_right()
            }else if(code === 40){
                game.control_down()
            }else if(code === 32){
                if(game.gameStatus === GameStatus.playing){
                    game.pause()
                }else {
                    game.start()
                }
            }
        })

    }
    /**
     * ESNext 语法，动态导入
     * @param teris 
     */
    showNext(teris: import("../SquareGroup").SquareGroup): void {
        teris.squares.forEach(sq=>{
            sq.viewer = new SquarePageViewer(sq,this.nextDom)
        })
    }
    switch(teris: import("../SquareGroup").SquareGroup): void {
        teris.squares.forEach(sq=>{
            // 这个感叹号！
            sq.viewer!.remove()
            sq.viewer = new SquarePageViewer(sq,this.panelDom)
        })
    }
    
}