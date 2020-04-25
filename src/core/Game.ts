import { GameStatus, MoveDirection, GameViewer } from "./types";
import { SquareGroup } from "./SquareGroup";
import { createTeris } from "./Teris";
import { TerisRule } from "./TerisRules";
import GameConfig from "./GameConfig";
import { Square } from "./Square";
export class Game {
    // 游戏状态：游戏中＼暂停＼结束等
    private _gameStatus:GameStatus = GameStatus.init;
    public get gameStatus(){
        return this._gameStatus;
    }
    // 当前玩家操作的方块
    private _curTeris?:SquareGroup;
    // 下一个方块
    private _nextTeris:SquareGroup = createTeris({x:0,y:0})
    // 计时器
    private _timer?:number
    // 自动下落间隔时间
    private _duration:number ;
    // 当前游戏中，已经存在的方块
    private _exists:Square[] = [];
    // 积分
    private _score:number = 0;

    public  get score(){
        return this._score;
    }
    public set score(val){
        this._score = val;
        this._viewer.showScore(val);
        const level = GameConfig.leavels.filter(it=>it.score <= val).pop()!;
        console.log("leave",this._duration)
        if(level.duration === this._duration){
            return;
        }
    
        this._duration = level.duration;
        // 级别发生变化
        // 停止计时
        if(this._timer){
            clearInterval(this._timer);
            this._timer = undefined;
            // 方块自由下落
            this.autoDrop();
        }
    }

    constructor(private _viewer:GameViewer){
        this.resetCenterPoint(GameConfig.nextSize.width,this._nextTeris)
        this._viewer.showNext(this._nextTeris);
        this._viewer.init(this);
        this._viewer.showScore(this._score)
        this._duration = GameConfig.leavels[0].duration;
    }
    /**
     * 重新开始游戏初始化
     */
    private init(){
        this._exists.forEach(sq=>{
            if(sq.viewer){
                sq.viewer.remove()
            }
        })
        this._exists = [];
        this._nextTeris =  createTeris({x:0,y:0})
        // 重新设置中心点坐标
        this.resetCenterPoint(GameConfig.nextSize.width,this._nextTeris)
        // 显示下一个方块
        this._viewer.showNext(this._nextTeris);
        this._curTeris = undefined;
        this.score = 0;
    }

    /**
     * 游戏开始
     */
    start(){
        // 游戏状态的改变
        if(this._gameStatus === GameStatus.playing){
            return;
        }
        // 从游戏结束到开始
        if(this._gameStatus === GameStatus.over){
            // 初始化操作
            this.init();
        }

        // 将状态改为游戏正在进行中
        this._gameStatus = GameStatus.playing;
        // 判断当前方块有没有值
        if(!this._curTeris){
           this.switchTeris();
        }
        // 控制当前方块的自由下落
        this.autoDrop();
        this._viewer.onGameStart();
    }

    /**
     * 游戏暂停
     */
    pause(){
        if(this._gameStatus === GameStatus.playing){
            this._gameStatus = GameStatus.pause;
            clearInterval(this._timer)
            this._timer = undefined;
            this._viewer.onGamePause()
        }
    }

    /**
     * 游戏的操作
     */
    control_left(){
        if(this._curTeris && this._gameStatus === GameStatus.playing){
            TerisRule.move(this._curTeris,MoveDirection.left,this._exists)
        }
    }
    control_right(){
        if(this._curTeris && this._gameStatus === GameStatus.playing){
            TerisRule.move(this._curTeris,MoveDirection.right,this._exists)
        }
    }
    control_down(){
        if(this._curTeris && this._gameStatus === GameStatus.playing){

            TerisRule.moveDirectly(this._curTeris,MoveDirection.down,this._exists)
            // 触底
            this.hitBottom()
        }
    }
    control_rotate(){
        if(this._curTeris && this._gameStatus === GameStatus.playing){
            TerisRule.rotate(this._curTeris,this._exists)
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
                // 是否触底
                let bool = TerisRule.move(this._curTeris,MoveDirection.down,this._exists);
                if(!bool){
                    this.hitBottom()
                }
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
            // teris.squares.forEach(sq=>sq.ce = {
                // x:sq.point.x,
                // y:sq.point.y + 1
            // })
            teris.centerPoint = {
                x:teris.centerPoint.x,
                y:teris.centerPoint.y + 1
            }
        }
    }
    /**
     * 触底处理函数
     */
    private hitBottom(){
        // 1. 将当前的每一个小方块存放到已存在的方块数组中
        // this._exists.push(...this._curTeris!.squares)
        this._exists = this._exists.concat(this._curTeris!.squares)
        // 处理移除
        const num = TerisRule.deleteSquares(this._exists);
         // 增加积分
        this.addScore(num)

        // 2. 切换方块（下一个方块）
        this.switchTeris();
       

    }

    private addScore(lineNum:number){
        if(lineNum ===0 ){
            return;
        }else if(lineNum === 1){
            this.score += 10;
        }else if(lineNum === 2){
            this.score += 25;
        }else if(lineNum === 3){
            this.score += 50
        }else if(lineNum === 4){
            this.score += 100
        }
        // console.log(this._score)
    }
    // 切换方块
    private switchTeris(){
         // 给当前玩家操作的方块赋值,赋值给下一个方块
         this._curTeris = this._nextTeris;
        // 　解决游戏结束后，右侧小方块跳动的问题
        this._curTeris.squares.forEach(sq=>{
            if(sq.viewer){
                sq.viewer.remove()
            }
        })
         this.resetCenterPoint(GameConfig.panelSize.width,this._curTeris)
        //  
        let bool = TerisRule.canIMove(this._curTeris.shape,this._curTeris.centerPoint,this._exists)
        if(!bool){
            // 改变游戏状态
            this._gameStatus = GameStatus.over;
            // 清空计时器
            clearInterval(this._timer);
            this._timer = undefined;
            this._viewer.onGameOver()
            return;
        }
         // 下一个方块改变
         this._nextTeris = createTeris({x:0,y:0})
         this.resetCenterPoint(GameConfig.nextSize.width,this._nextTeris)
        this._viewer.switch(this._curTeris);
        this._viewer.showNext(this._nextTeris);
    }
}