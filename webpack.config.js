const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',

    entry: path.resolve(__dirname, 'src/index.js'),

    output: {
        filename: 'bundle.js',

        path: path.resolve(__dirname, 'build'),

        publicPath: '/'
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html'
        })
    ]
};
