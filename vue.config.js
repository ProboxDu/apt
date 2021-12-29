module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://10.2.13.232:8000',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
            '/upload':{
                target: 'http://127.0.0.1:8000',
                ws: true,
                changeOrigin: true,
            }
        },
        disableHostCheck: true,
    }
}
