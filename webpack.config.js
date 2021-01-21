const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require("webpack");
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.(ttf|woff|eot)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test: /\.ejs$/,
                use: {
                    loader: 'ejs-compiled-loader',
                    options: {
                        htmlmin: false,
                    }
                }
            },
            {
                test: /\.md$/,
                use: {
                    loader: 'raw-loader',
                    options: {
                        esModule: false,
                    },
                },
            }
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.GITHUB_REPOSITORY': JSON.stringify(process.env.GITHUB_REPOSITORY)
        }),
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: './src/index.ejs'
        }),

    ]
};
