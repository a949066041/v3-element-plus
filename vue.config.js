/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

module.exports = {
  // 开启服务检测eslint 不可删除
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    },
    port: '9999',
    proxy: process.env.VUE_APP_BASE_API // api 的 base_url
  },
  productionSourceMap: false,
  chainWebpack (config) {
    config
      .optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial' // only package third parties that are initially dependent
          },
          antdv: {
            name: 'chunk-element', // split elementUI into a single package
            priority: 12, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element(.*)/ // in order to adapt to cnpm
          },
          components: {
            name: 'chunk-components',
            test: path.join(__dirname, 'src/components'), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          },
          hooks: {
            name: 'chunk-hooks',
            test: path.join(__dirname, 'src/hooks'),
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      })
  }
}
