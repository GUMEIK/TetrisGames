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


