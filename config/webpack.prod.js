// 引入一个包
const path = require("path");
// 引入HTML插件
const HTMLWebpackPlugin = require("html-webpack-plugin");
// 引入EsLint插件
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
// 引入CSS单独打包插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 引入CSS压缩打包插件
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

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
                // 使用oneOf去优化打包速度，当文件对应的处理loader被检测到，就不用再去遍历其他的loader，提升打包速度
                oneOf: [
                    {
                        // 指定规则生效的文件
                        test: /\.ts$/,
                        // 要使用的loader
                        use: [
                            // 配置babel
                            {
                                // 指定加载器
                                loader: "babel-loader",
                                // 设置babel
                                options: {
                                    // 开启babel缓存
                                    cacheDirectory: true,
                                    // 关闭缓存文件压缩
                                    cacheCompression: false,
                                    // 减少代码体积
                                    plugins: ["@babel/plugin-transform-runtime"],
                                }
                            },
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
                                            "postcss-preset-env"
                                        ]
                                    }
                                }
                            },
                            "less-loader"
                        ]
                    }
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
            // 排除检查目录
            exclude: "node_modules",
            // 开启缓存
            cache: true,
            // 缓存输出文件路径
            cacheLocation: path.resolve(__dirname, "../node_modules/.cache/eslintcache")
        }),
        // 提取css成单独文件
        new MiniCssExtractPlugin({
            // 定义输出文件名和目录
            filename: "static/css/main.css"
        })
    ],

    // 配置压缩插件，webpack5官方建议使用这种方式
    optimization: {
        minimizer: [
            // css压缩
            new CssMinimizerPlugin()
        ]
    },

    // 设置引用模块
    resolve: {
        extensions: [".ts", ".js"]
    }
};