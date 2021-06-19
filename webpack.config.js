const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path')

module.exports = (env) => {
    return {
        entry: './renderer/main.js',
        output: {
            filename: '[name].bundle.js',
            path: path.resolve(__dirname, 'app'),
        },
        resolve: {
            alias: {
                vue: 'vue/dist/vue.js',
                config: path.resolve(__dirname, `renderer/config.${env.env}.js`),
                '@': path.resolve(__dirname, "renderer"),
            },
            extensions: ['*', '.js', '.vue', '.json'],
        },
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: 'vue-loader'
                },
                {
                    test: /\.js$/,
                    loader: 'babel-loader'
                },
                {
                    test: /\.css$/,
                    use: [
                        'vue-style-loader',
                        'css-loader'
                    ]
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: 'asset/resource',
                },
            ],
        },
        plugins: [
            new HtmlWebPackPlugin({
                template: "./renderer/index.html",
                hash: true,
            }),
            new VueLoaderPlugin(),
            new CleanWebpackPlugin(),
        ],
    }
}