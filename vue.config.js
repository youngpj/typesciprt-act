const path = require('path');
function resolve (dir) {
    return path.join(__dirname, dir)
}
// const CompressionPlugin = require('compression-webpack-plugin')
// const productionGzipExtensions = ['js', 'css']
module.exports = {
    // 选项...
    publicPath: './',
    outputDir: 'dist',
    indexPath: 'index.html',
    // pages: {
    //     index: {
    //         // page 的入口
    //         entry: 'src/index/main.js',
    //         // 模板来源
    //         template: 'public/index.html',
    //         // 在 dist/index.html 的输出
    //         filename: 'index.html',
    //         // 当使用 title 选项时，
    //         // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
    //         title: 'Index Page',
    //         // 在这个页面中包含的块，默认情况下会包含
    //         // 提取出来的通用 chunk 和 vendor chunk。
    //         chunks: ['chunk-vendors', 'chunk-common', 'index']
    //     },
    //     // 当使用只有入口的字符串格式时，
    //     // 模板会被推导为 `public/subpage.html`
    //     // 并且如果找不到的话，就回退到 `public/index.html`。
    //     // 输出文件名会被推导为 `subpage.html`。
    //     subpage: 'src/subpage/main.js'
    // },
    productionSourceMap: false,
    css: {
        requireModuleExtension: true,
        sourceMap: false,
         modules: false,
        loaderOptions: {

        }
    },
    // externals: {
    //     swiper: 'swiper'
    //   },
    // crossorigin:'anonymous',
    // integrity:true,
    configureWebpack: {
        externals: {
            "moment": "moment",
            "vue":"Vue",
            "vue-router":"VueRouter" 
        },
        // plugins: [
        //     new CompressionPlugin({
        //         asset: '[path].gz[query]',   // 提示compression-webpack-plugin@3.0.0的话asset改为filename
        //         algorithm: 'gzip',
        //         test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        //         threshold: 10240,
        //         minRatio: 0.8,
        //         // deleteOriginalAssets:true
        //     })
        // ]

    },
    lintOnSave: true,
    chainWebpack: (config)=>{
        config.resolve.alias
            .set('img',resolve('src/assets/img'))
    },
    devServer: {
        proxy: {
            '/cms/api/*': {
                target: 'https://test.msjk95596.com/',
                changeOrigin: true,
                ws: true,
                headers: {
                    'Accept': 'application/json, text/plain',
                    'X-Requested-With': 'XMLHttpRequest'
                },
            },
            '/action': {
                target: 'https://test.msjk95596.com/',
                changeOrigin: true
            },
            '/ins/api':{
                target: 'http://activitytest.minshenglife.com/',
                changeOrigin: true
            },
            '/': {
                //target: 'http://test.msjk95596.com/',
                target: ' http://192.168.1.170:8383/',
               
                changeOrigin: true
            },
        }
    }
}