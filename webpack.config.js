const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin-advanced');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: ['./scripts/app.js', './styles/app.scss'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.bundle.js',
        publicPath: '',
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'src'),
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['env']
                }
            },
            {
                test: /\.(png|jpg|gif|svg|woff|woff2|eot|ttf)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ],
    },
    mode: process.env.NODE_ENV,
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            favicon: './assets/favicon.ico',
            template: './index.html'
        })
    ],
};