**2020年4月19日晚，项目启动**
# 项目概述
## TetrisGames
俄罗斯方块的游戏制作
## 项目的目的
1. 学习webpack结合TS做开发
2. 巩固TS的基础知识
3. 锻炼逻辑思维能力
4. 体验面向对象的思想（有些思想靠理解是达不到那个程度的，需要大量的练习）
##技术栈
webpack + jquery(方便dom操作) + typescript + 面向对象思想
## 须知
整个项目可能比较复杂，切忌浮躁，要稳扎稳打，慢慢来。


# 工程搭建
环境：浏览器 + 模块化
工具：webpack
## html-webpack-plugin插件
html-webpack-plugin将html文件打包到出口文件，该文件会自动将js文件引入
[官网](https://www.npmjs.com/package/html-webpack-plugin)

安装：开发依赖

## clean-webpack-plugin插件
清除ｄｉｓｔ目录重新进行打包
[官网](npmjs.com/package/clean-webpack-plugin)
## webpack-dev-server
## 安装ts的相应的加载器(二选一)
他们依赖ｔｓ，所以还要安装ts(注意需要tsconfig.json文件)
- ts-loader(官方)
- awsome-typescript-loader（民间）

# 游戏开发
**面向对象的一些原则**
单一职能原则:每个类只做跟它相关的一件事

开闭原则：系统中的类应该对扩展开放，对修改关闭．（增加功能时尽量不要修改类的代码，而是增加代码来进行功能的扩展）

1. 所有的属性全部私有化


**模式**
仿照react使用＂数据－视图＂分离　　模式
core:核心数据类，只涉及数据处理
## 小方块类的开发
- 小方块不知道怎么显示，但是知道什么时候显示
**2020年４月２０日**
## 小方块的显示类(core/viewer目录)

安装：
jquery及其类型库(@types/jquery)(开发依赖)
## 小方块的组合类
本质是小方块的数组
- 小方块的数组
## 俄罗斯方块的生产者类
进行形状预定义，随机产生形状
**2020年４月２２日**
## 俄罗斯方块规则类
## 俄罗斯方块的旋转
旋转的本质就是改变形状(形状的本质是数组)
本质：根据当前形状产生一个新的形状
rotate　方法有一种通用的实现方式，但是，不同情况下会有不同的具体实现

将SquareGroup作为父类，其他的小方块都是它的子类，子类可以重写父类的方法
**2020年４月２５日**
## 游戏类
控制整个游戏的进程
-　方块的下落，消除，下一个方块的形状灯
Game清楚什么时候切换，但是不知道如何显示

## 触底处理
触底：当前方块到达最底部，这里的底部不一定是界面的最底部，有可能下面有方块，也是触底．
### 什么时候触底
什么时候调用触底函数
### 触底后要做的事情：
触底函数如何编写
- 切换方块
- 当触底后如何保存已经落下的方块（保存已经落下的方块）
- 如何根据已经保存的方块，判断当前方块是否可以移动
- 消除方块的处理
    - 消除时做哪些事情(从界面移除，从数组中移除，改变ｙ坐标)
- 游戏是否结束？（在切换方块的时候进行判断）
## 积分