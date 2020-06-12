
module.exports = {
  devServer: {
    disableHostCheck: true,
    proxy: {
      '/': {
        target: 'http://114.55.25.222:8080/',
        ws: true,
        secure: false,
        changeOrigin: false,
        pathRewrite: {
          '^/mock': ''
        }
      }
    }
  }
}
