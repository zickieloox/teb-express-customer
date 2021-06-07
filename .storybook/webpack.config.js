const path = require('path')

module.exports = function(baseConfig, env, defaultConfig) {
  defaultConfig.module.rules.push({
    test: /\.stories\.jsx?$/,
    loaders: [require.resolve('@storybook/addon-storysource/loader')],
    enforce: 'pre',
  })

  defaultConfig.module.rules = defaultConfig.module.rules.filter(
    (rule) => !rule.test.test('.scss')
  )

  // Make whatever fine-grained changes you need
  defaultConfig.module.rules.push({
    test: /\.scss$/,
    use: ['style-loader', 'css-loader', 'sass-loader'],
    include: [
      path.resolve(__dirname, '../src/assets/_new/scss'),
      path.resolve(__dirname, '../uikit/styles/pkit.scss'),
    ],
  })

  return defaultConfig
}
