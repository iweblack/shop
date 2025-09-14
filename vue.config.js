module.exports = {
    // http://127.0.0.1:8082/api
    // outputDir: './dist',
    // publicPath: '/shop-front/',
    lintOnSave: false,
    devServer: {
        host: '127.0.0.1',
        port: 8080,
        proxy: {
            '/api': {
                target: '//101.33.32.225:8002',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}
