const path = require('path')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '',
  productionSourceMap: false,
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: 'com.github.runly.smallKeyboard',
        mac: {
          icon: path.resolve(__dirname, './public/files/icon.icns')
        },
        win: {
          icon: path.resolve(__dirname, './public/files/icon.ico')
        }
      }
    }
  },
  configureWebpack: (config) => {
    config.resolve = { // 配置解析别名
      extensions: ['.js', '.json', '.vue'],
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    }
  }
}
