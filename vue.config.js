const IN_PRODUCTION = process.env.NODE_ENV === 'production';
const path = require('path');

let publicPath;
if (IN_PRODUCTION) {
    publicPath = '/';
} else {
    publicPath = '/';
}

module.exports = {
    pages: {
        index: {
            entry: 'src/main.js',
            template: 'public/index.html',
            filename: 'index.html',
            title: 'KLDB'
        }
    },
    publicPath: publicPath,
    assetsDir: 'static',
    outputDir: 'dist',
    configureWebpack: {
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src'),
                '@components': path.resolve(__dirname, 'src', 'components'),
                '@routes': path.resolve(__dirname, 'src', '_config', 'routes')
            }
        }
    },
    devServer: {
        // proxy: 'http://localhost:8000',
        // proxy: 'https://kldb-lms.xeoscript.com/',
        proxy: 'https://kldblms.xeoscript.com/',
        clientLogLevel: 'warning',
        hot: true,
        contentBase: 'dist',
        compress: true,
        open: true,

        overlay: {
            warnings: false,
            errors: true
        },
        publicPath: '/',
        quiet: true,
        watchOptions: {
            poll: false
            // ignored: /node_modules/
        }
    }
};
