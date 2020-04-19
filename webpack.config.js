const path = require("path");
// 将public目录下的index.html打包，并自动引入js文件
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 清除多余的ｊｓ代码,先清理ｄｉｓｔ目录，再重新进行打包
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
        entry:"./src/index.ts",
        output:{
            // 出口文件根目录,转换成绝对路径
            path:path.resolve("./dist"),
            filename:"script/bundle.js"
        },
        plugins:[
            new HtmlWebpackPlugin({
                // 以该页面为模板，生成打包页面
                template:"./public/index.html"
            }),
            new CleanWebpackPlugin()

        ],
        module:{
            rules:[
                {
                    test:/.ts$/,
                    loader:"ts-loader"
                }
            ]
        },
        resolve:{
            // 加入解析的扩展名
            extensions:[".ts",".js"]
        }
}