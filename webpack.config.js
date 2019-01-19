const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin-advanced');
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
            }
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CopyWebpackPlugin([
            {
              from: './assets/**/**',
              flatten: true,
            },
            {
              from: 'index.html'
            },
          ])
    ],
};