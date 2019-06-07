const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: ['./src/main.js'],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    devServer: {
        host: '127.0.0.1',
        historyApiFallback: true,
        port: 8000
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: [
                        ['@babel/env']
                    ]
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        less: 'vue-style-loader!css-loader!less-loader',
                    }
                }
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            data: '@import "./src/styles/theme/colors";'
                        },
                    }]
            },
            {
                test: /\.svg/,
                use: {
                    loader: 'svg-url-loader',
                }
            },
            {
                test: /\.css$/,
                loaders: ["style-loader","css-loader"]
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                loader:"file-loader",
                options:{
                    name:'[name].[ext]',
                    outputPath:'assets/images/'
                    //the images will be emited to dist/assets/images/ folder
                }
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery'",
            "window.$": "jquery"
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '\'' + process.env.NODE_ENV + '\'',
            },
        }),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({ template: 'src/index.html', inject: true }),
    ]
}
