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
        filename: "[name].[contenthash:10].js",

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
                            "style-loader",
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
        })
    ],

    // 配置压缩插件，webpack5官方建议使用这种方式
    optimization: {
        // 将代码依赖单独记录到runtime文件中，保证依赖文件变更时，只改变它本身的hash和runtime的hash而不改变依赖者的hash
        runtimeChunk: {
            name: (entrypoint) => `runtime~${entrypoint.name}.js`
        }
    },

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