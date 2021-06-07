module.exports = {
  publicPath: process.env.PUBLIC_PATH || '/',
  productionSourceMap: false,
  configureWebpack: {
    name: 'Lionnix',
    resolve: {
      alias: require('./aliases.config').webpack,
    },
    devtool: process.env.VUE_APP_SOURCE_MAP || undefined,
  },
  css: {
    sourceMap: false,
  },
  devServer: {
    disableHostCheck: true,
    watchOptions: {
      ignored: /node_modules/,
      poll: 5007,
    },
  },
}
