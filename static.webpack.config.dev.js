const merge = require('webpack-merge')
const WebpackBar = require('webpackbar')

const StaticCommonConfig = require('./static.webpack.config.common')

const Config = merge.smartStrategy(
  {
    devtool: 'replace',
    'module.rules.use': 'prepend'
  }
)(StaticCommonConfig, {
  mode: 'development',
  devtool: 'inline-cheap-module-source-map',
  devServer: {
    historyApiFallback: true,
    public: 'jet2.intrepid-geophyics.com',
    allowedHosts: [
      '0.0.0.0',
    ],
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        exclude: /portals/i,
        use: [
          {
            loader: 'style-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new WebpackBar()
  ]
})

module.exports = Config
