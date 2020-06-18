const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: './src/js/Main.js',
    output: {
        path: path.resolve(__dirname, 'dist/js'),
        filename: 'main_bundle.js'
    },
    plugins: [
        new htmlWebpackPlugin ({
            // it's ../ because the path for this configuration is to the js directory in output.
            filename: '../index.html',
            template: './src/index.html'
        })
    ]

}