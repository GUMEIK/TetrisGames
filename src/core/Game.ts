import { GameStatus, MoveDirection, GameViewer } from "./types";
import { SquareGroup } from "./SquareGroup";
import { createTeris } from "./Teris";
import { TerisRule } from "./TerisRules";
import GameConfig from "./GameConfig";
export class Game {
    // 游戏状态：游戏中＼暂停＼结束等
    private _gameStatus:GameStatus = GameStatus.init;
    // 当前玩家操作的方块
    private _curTeris?:SquareGroup;
    // 下一个方块
    private _nextTeris:SquareGroup = createTeris({x:0,y:0})
    // 计时器
    private _timer?:number
    // 自动下落间隔时间
    private _duration:number = 1000;

    constructor(private _viewer:GameViewer){
        this.resetCenterPoint(GameConfig.nextSize.width,this._nextTeris)
        this._viewer.showNext(this._nextTeris);
    }



    /**
     * 游戏开始
     */
    start(){
        // 游戏状态的改变
        if(this._gameStatus === GameStatus.playing){
            return;
        }
        // 将状态改为游戏正在进行中
        this._gameStatus = GameStatus.playing;
        // 判断当前方块有没有值
        if(!this._curTeris){
           this.switchTeris();
        }
        // 控制当前方块的自由下落
        this.autoDrop();
    }

    /**
     * 游戏暂停
     */
    pause(){
        if(this._gameStatus === GameStatus.playing){
            this._gameStatus = GameStatus.pause;
            clearInterval(this._timer)
            this._timer = undefined;
        }
    }

    /**
     * 游戏的操作
     */
    control_left(){
        if(this._curTeris && this._gameStatus === GameStatus.playing){
            TerisRule.move(this._curTeris,MoveDirection.left)
        }
    }
    control_right(){
        if(this._curTeris && this._gameStatus === GameStatus.playing){
            TerisRule.move(this._curTeris,MoveDirection.right)
        }
    }
    control_down(){
        if(this._curTeris && this._gameStatus === GameStatus.playing){
            TerisRule.moveDirectly(this._curTeris,MoveDirection.down)
        }
    }
    control_rotate(){
        if(this._curTeris && this._gameStatus === GameStatus.playing){
            TerisRule.rotate(this._curTeris)
        }
    }
    // 当前方块自由下落
    // 有可能外界会用到，所以，要写成独立的函数
    private autoDrop(){
        if(this._timer || this._gameStatus !== GameStatus.playing){
            return;
        }
        this._timer = setInterval(()=>{
            if(this._curTeris){
                TerisRule.move(this._curTeris,MoveDirection.down);
            }
        },this._duration)

    }

    /**
     * 设置中心点坐标，让该方块出现在区域的中上方
     * @param width 逻辑宽度，不是像素值
     */
    resetCenterPoint(width:number,teris:SquareGroup){
        const x = Math.ceil(width /2 - 1);
        const y = 0;
        teris.centerPoint = {x,y};
        while(teris.squares.some(it => it.point.y < 0)){
            // TerisRule.move(teris,MoveDirection.down)
            teris.squares.forEach(sq=>sq.point = {
                x:sq.point.x,
                y:sq.point.y + 1
            })
        }
    }


    // 切换方块
    private switchTeris(){
         // 给当前玩家操作的方块赋值,赋值给下一个方块
         this._curTeris = this._nextTeris;
         this.resetCenterPoint(GameConfig.panelSize.width,this._curTeris)
         // 下一个方块改变
         this._nextTeris = createTeris({x:0,y:0})
         this.resetCenterPoint(GameConfig.nextSize.width,this._nextTeris)
        this._viewer.switch(this._curTeris);
        this._viewer.showNext(this._nextTeris);
    }
}