// 引入一个包
const path = require("path");
// 引入HTML插件
const HTMLWebpackPlugin = require("html-webpack-plugin");
// 引入EsLint插件
const ESLintWebpackPlugin = require("eslint-webpack-plugin");

// webpack中的所有配置信息
module.exports = {
    // 模式：development开发、production生产
    mode: "development",
    // 指定入口文件
    entry: "./src/main.ts",

    // 指定打包文件所在目录
    output: {
        // 指定打包文件的目录
        path: undefined,
        // 打包后的文件名
        filename: "bundle.js",

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
                    "style-loader",
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
        })
    ],

    // 设置引用模块
    resolve: {
        extensions: [".ts", ".js"]
    },

    // 开发服务器
    devServer: {
        host: "localhost", // 启动服务器域名
        port: "8099", // 启动服务器端口号
        open: true, // 是否自动打开浏览器
    }
};