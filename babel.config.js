module.exports = {
    // 设置预定义环境
    presets: [
        [
            // 指定环境的插件
            "@babel/preset-env",
            // 配置信息
            {
                // 要兼容的目标浏览器
                targets: {
                    "chrome": "100",
                    "ie": "11"
                },
                // 指定corejs的版本
                corejs: "3",
                // 使用corejs的方式：usage表示按需加载
                useBuiltIns: "usage"
            }
        ]
    ]
};