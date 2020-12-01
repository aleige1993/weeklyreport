module.exports = {
    devServer:{
        port:9999, // 启动端口
        open:true,  // 启动后是否自动打开网页
        proxy: {
		    '/api': {
			      target: 'http://3541l1m171.qicp.vip', // 要代理的地址
			      changeOrigin: true, //允许跨域
			      secure: false,  // 如果是https接口的话，需要配置这个参数
			      pathRewrite: { },  //重写接口
			      ws: false
		    }
		 }
    },
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require('postcss-pxtorem')({ // 把px单位换算成rem单位
                        rootValue: 75, // 换算的基数(设计图750的根字体为75)
                        selectorBlackList: ['van'], // 忽略转换正则匹配项
                        propList: ['*']
                    })
                ]
            }
        }
    },
    lintOnSave: false,
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            // 为生产环境修改配置...
        } else {
            // 为开发环境修改配置...
        }
    }
};