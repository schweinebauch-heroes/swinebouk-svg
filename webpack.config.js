const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		index: './src/index.js'
	},
	mode: 'development',
	devServer: {
		contentBase: './dist',
		hot: true
	},
	devtool: 'inline-source-map',
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: require.resolve('snapsvg/dist/snap.svg.js'),
				use: 'imports-loader?this=>window,fix=>module.exports=0'
			},
			{
				test: require.resolve('./src/base-style.css'),
				use: ['to-string-loader', 'css-loader']
			},
			{
				test: require.resolve('./src/DejaVuSans.ttf'),
				use: ['url-loader']
			},
			{
				test: require.resolve('modern-normalize/modern-normalize.css'),
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
	]
};
