const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	mode: 'development',
	entry: {
		'app': [
			'./src/js/index.js',
			'./src/scss/main.scss'
		],
		// 'app': './src/index.js',
		print: './src/js/print.js',
	},
	output: {
		// filename: 'main.js',
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/'
	},
	devServer: {
		contentBase: './dist',
		hot: true
	},
	module: {
    	rules: [
			{
				test: /\.js$/,
				include: path.resolve(__dirname, 'src'),
				loader: 'babel-loader'
			},
			// {
			// 	test: /\.(sass|scss)$/,
			// 	include: path.resolve(__dirname, 'src/scss'),
			// 	use: ExtractTextPlugin.extract({
			// 		use: [{
			// 			loader: "css-loader",
			// 			options: {
			// 				sourceMap: true,
			// 				minimize: true,
			// 				url: false
			// 			}
			// 		},
			// 		{
			// 			loader: "sass-loader",
			// 			options: {
			// 				sourceMap: true
			// 			}
			// 		}
			// 		]
			// 	})
			// },
			{
				test: /\.scss$/,
				use: [
					process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
					"style-loader", // creates style nodes from JS strings
					"css-loader", // translates CSS into CommonJS
					"sass-loader" // compiles Sass to CSS, using Node Sass by default
				]
			},
		    {
				test: /\.(png|svg|jpg|gif)$/,
				use: ['file-loader']   
		    }  
		]
	},
	devtool: 'inline-source-map',
	plugins: [
		// new CleanWebpackPlugin(['dist/*']) for < v2 versions of CleanWebpackPlugin
		// new CleanWebpackPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// both options are optional
			filename: "[name].css",
			chunkFilename: "[id].css"
		}),
		// new ExtractTextPlugin({
		// 	filename: './css/style.bundle.css',
		// 	allChunks: true,
		// }),
		new webpack.HotModuleReplacementPlugin()
	],
};