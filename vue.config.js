module.exports = {
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
