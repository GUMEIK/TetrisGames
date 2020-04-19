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