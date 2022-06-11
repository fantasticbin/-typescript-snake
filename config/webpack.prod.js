// 引入一个包
const path = require("path");
// 引入HTML插件
const HTMLWebpackPlugin = require("html-webpack-plugin");
// 引入EsLint插件
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
// 引入CSS单独打包插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// webpack中的所有配置信息
module.exports = {
    // 模式：development开发、production生产
    mode: "production",
    // 指定入口文件
    entry: "./src/main.ts",

    // 指定打包文件所在目录
    output: {
        // 指定打包文件的目录
        path: path.resolve(__dirname, "../dist"),
        // 打包后的文件名
        filename: "static/js/bundle.js",
        // 自动清空上一次打包的内容，webpack4需使用扩展包clean-webpack-plugin插件来进行自动清空操作
        clean: true,

        // 不使用箭头函数的方式定义
        environment: {
            arrowFunction: false,
            const: false
        }
    },

    // 指定webpack打包时要使用的模块
    module: {
        // 指定要加载的规则
        rules: [
            {
                // 指定规则生效的文件
                test: /\.ts$/,
                // 要使用的loader
                use: [
                    "babel-loader",
                    "ts-loader"
                ],
                // 要排除的文件
                exclude: /node_modules/
            },

            // 设置less文件的处理
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    // 引入postcss
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            browsers: "last 2 versions"
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    "less-loader"
                ]
            }
        ]
    },

    // 配置webpack插件
    plugins: [
        new HTMLWebpackPlugin({
            template: "./public/index.html"
        }),
        new ESLintWebpackPlugin({
            // 指定检查文件的根目录
            context: path.resolve(__dirname, "../src"),
        }),
        // 提取css成单独文件
        new MiniCssExtractPlugin({
            // 定义输出文件名和目录
            filename: "static/css/main.css",
        })
    ],

    // 设置引用模块
    resolve: {
        extensions: [".ts", ".js"]
    }
};