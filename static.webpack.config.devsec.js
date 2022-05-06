const merge = require('webpack-merge')
const WebpackBar = require('webpackbar')

const StaticCommonConfig = require('./static.webpack.config.common')

var fs = require('fs');

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
    https: {
      key: fs.readFileSync('/etc/letsencrypt/live/jet.intrepid-geophysics.com/privkey.pem'),
      cert: fs.readFileSync('/etc/letsencrypt/live/jet.intrepid-geophysics.com/cert.pem'),
      ca: fs.readFileSync('/etc/letsencrypt/live/jet.intrepid-geophysics.com/chain.pem'),
    }
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
