var fs = require('fs')
var path = require('path')
var webpack = require('webpack')

module.exports = {
	devtool: 'source-map',
	entry: __dirname + '/src/js/main.js',
	output: {
		path: __dirname + '/dist',
		filename: '[name].js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel',
				query: {
					presets: ["react","es2015","stage-0"]
				}
			}
		]
	}
};