const path = require('path')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '',
  productionSourceMap: false,
  configureWebpack: (config) => {
    config.resolve = { // 配置解析别名
      extensions: ['.js', '.json', '.vue'],
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    }
  }
}
