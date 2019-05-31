var webpack = require('webpack');
var path = require('path');
var q = require('q');
var gulp = require('gulp');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

var dist_path = path.resolve(__dirname, '../dist');
var app_entrypoint = path.resolve(__dirname, '../src/homogenize-triangles.js');
var demo_entrypoint = path.resolve(__dirname, '../src/demo.js');

var vendor_deps = Object.keys(require('../package.json').dependencies);
var extra_plugins = [];
var appConf;

var doPack = function(conf, watch){

    var pack_def = q.defer();

    var reportStats = function (err, stats) {
        console.log(stats.toString({
            colors: true
        }));

        if (err) {
            pack_def.reject();
            return;
        }

        pack_def.resolve();
    };

    var compiler = webpack(conf);

    if(watch){
        compiler.watch({
            aggregateTimeout: 300,
            ignored: [/[\\/]node_modules[\\/]/, /[\\/]assets[\\/]generated[\\/]/]
        }, reportStats);
    }else{
        compiler.run(reportStats);
    }

    return pack_def.promise;

};

gulp.task('webpack-vendor', async function webpackVendor () {
    return doPack({
        entry: {
            vendor: vendor_deps
        },

        output: {
            path: dist_path,
            filename: '[name].js',
            library: '[name]',
            publicPath: '/'
        },

        node: {
            fs: "empty"
        },

        plugins: [
            new webpack.DllPlugin({
                name: '[name]',
                path: path.join( dist_path, '[name]-manifest.json' ),
            })
        ]
    }, false);
});


gulp.task('webpack', gulp.series('webpack-vendor', async function webpackWatch () {
    appConf = {
        entry: {
            "homogenize-triangles": app_entrypoint,
            "demo": demo_entrypoint
        },
        output: {
            path: dist_path,
            filename: '[name].js',
            publicPath: '/'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                }
            ]
        },

        plugins: [
            new webpack.DllReferencePlugin({
                manifest: require(path.join(dist_path, 'vendor-manifest.json')),
            }),

            new webpack.SourceMapDevToolPlugin({
                exclude: ['vendor'],
                filename: '[name].js.map'
            })
        ].concat(extra_plugins)
    };

    return doPack(appConf, true);
}));