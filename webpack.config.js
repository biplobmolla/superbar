const webpack = require("webpack");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const { env } = require("process");

module.exports = (env) => {
	return {
		entry: {
			popup: path.join(__dirname, "src/popup.ts"),
			content: path.join(__dirname, "src/content.ts"),
			background: path.join(__dirname, "src/background.ts"),
		},
		output: {
			path: path.join(__dirname, "dist"),
			publicPath: "",
			filename: "[name].js",
		},
		module: {
			rules: [
				{
					test: /\.(js|jsx|ts|tsx)$/,
					use: "babel-loader",
					exclude: /node_modules/,
				},
				{
					test: /\.(scss|css)$/,
					use: ["style-loader", "css-loader", "sass-loader"],
					exclude: /\.module\.css$/,
				},
				{
					test: /\.less$/,
					use: [
						{
							loader: "style-loader",
						},
						{
							loader: "css-loader",
						},
						{
							loader: "less-loader",
							options: {
								lessOptions: {
									javascriptEnabled: true,
								},
							},
						},
					],
					include: /node_modules/,
				},
				{
					test: /\.css$/,
					use: [
						"style-loader",
						{
							loader: "css-loader",
							options: {
								importLoaders: 1,
								modules: true,
							},
						},
					],
					include: /\.module\.css$/,
				},
				{
					test: /\.svg$/,
					use: [
						{
							loader: "svg-url-loader",
							options: {
								limit: 10000,
							},
						},
					],
				},
				{
					test: /\.png$/,
					use: [
						{
							loader: "url-loader",
							options: {
								mimetype: "image/png",
							},
						},
					],
				},
				{
					test: /\.mjs$/,
					include: /node_modules/,
					type: "javascript/auto",
				},
				{ test: /\.js$/, include: /node_modules/, type: "javascript/auto" },
				// {
				// 	test: /\.js$/,
				// 	include: "/node_modules/",
				// 	loader: "transform-loader?brfs",
				// },
			],
		},
		resolve: {
			extensions: [".js", ".jsx", ".tsx", ".ts"],
			alias: {
				"react-dom": "@hot-loader/react-dom",
			},
		},
		devServer: {
			contentBase: "./dist",
		},
		plugins: [
			new CopyPlugin({
				patterns: [{ from: "public", to: "." }],
			}),
			new Dotenv({
				path: env?.development
					? ".env.development"
					: env?.staging
					? ".env.staging"
					: ".env",
			}),
		],
	};
};
