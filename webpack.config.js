const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = () => {

    const isProduction = process.env.NODE_ENV === 'production';

    console.log(isProduction ? 'PRODUCTION MODE' : 'DEVELOPMENT MODE');

    return {
        entry: './src/index.ts',
        mode: isProduction ? 'production' : 'development',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js'
        },
        plugins: [
            new CleanWebpackPlugin(),
        ],
        resolve: {
            extensions: [ '.ts', '.js' ],
            modules: [ path.resolve(__dirname, 'node_modules') ],
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader',
                },
            ],
        },
    };
}