const { webpackConfig } = require('@rails/webpacker')
const webpack = require("webpack") 

webpackConfig.plugins.unshift(
  new webpack.ProvidePlugin({
    $:      'jquery',
    jQuery: 'jquery',
    jquery: 'jquery',
    Popper: ['popper.js', 'default']
}))
//webpackConfig.loaders.delete('nodeModules')
module.exports = webpackConfig
