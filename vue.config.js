module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:7000',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/api': '/api'
        },
      },
    }
  },
  configureWebpack: {
    devtool: 'source-map'
  },
  chainWebpack: config => {
    config.plugin('copy').tap(options => {
      options[0][0].ignore.push('assets/styles.scss')
      options[0][0].ignore.push('assets/switch.sass')
      options[0][0].ignore.push('assets/tree.less')
      options[0][0].ignore.push('_support/**/*')
      options[0][0].ignore.push('assets/images/styles/**/*')
      options[0][0].ignore.push('assets/images/**/*.svg')
      options[0][0].ignore.push('assets/images/**/unknown.svg')
      options[0][0].ignore.push('assets/avatars/**/*')
      return options;
    });
  },
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: false
    }
  }
}