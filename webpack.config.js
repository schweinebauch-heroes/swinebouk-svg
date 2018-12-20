const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/index.js',
	mode: 'development',
	devServer: {
		contentBase: './dist',
		hot: true
	},
	devtool: 'inline-source-map',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: require.resolve('snapsvg/dist/snap.svg.js'),
				use: 'imports-loader?this=>window,fix=>module.exports=0'
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'templates/index.html',
			title: 'Swinebouk'
		}),
		new webpack.HotModuleReplacementPlugin()
	],
	resolve: {
		alias: {
			snapsvg: 'snapsvg/dist/snap.svg.js'
		}
	}
};
