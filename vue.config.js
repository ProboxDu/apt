module.exports = {
    assetsDir: 'static',  //指定`build`时,在静态文件上一层添加static目录
    devServer: {
        port: 8080,
        proxy: {
            '/api': {
                target: 'http://10.2.13.232:8000',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
            '/upload':{
                target: 'http://localhost:8000',
                ws: true,
                changeOrigin: true,
            },
        },
        disableHostCheck: true,
    }
}
