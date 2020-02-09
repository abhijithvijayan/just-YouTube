const path = require('path');
const webpack = require('webpack');
const wextManifest = require('wext-manifest');
const ZipPlugin = require('zip-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WriteWebpackPlugin = require('write-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ExtensionReloader = require('webpack-extension-reloader');

const manifestInput = require('./src/manifest');

const nodeEnv = process.env.NODE_ENV || 'development';
const targetBrowser = process.env.TARGET_BROWSER;
const manifest = wextManifest[targetBrowser](manifestInput);

const extensionReloaderPlugin =
    nodeEnv === 'development'
        ? new ExtensionReloader({
              port: 9090,
              reloadPage: true,
              entries: {
                  filter_youtube: 'filter_youtube',
              },
          })
        : () => {
              this.apply = () => {};
          };

const getExtensionFileType = browser => {
    if (browser === 'opera') {
        return 'crx';
    }
    if (browser === 'firefox') {
        return 'xpi';
    }

    return 'zip';
};

module.exports = {
    mode: nodeEnv,

    entry: {
        filter_youtube: './src/scripts/filter_youtube.js',
    },

    output: {
        filename: 'js/[name].bundle.js',
        path: path.resolve(__dirname, 'extension', targetBrowser),
    },

    module: {
        rules: [
            {
                test: /.(js)$/,
                include: [path.resolve(__dirname, 'src/scripts')],
                loader: 'babel-loader',

                options: {
                    plugins: ['syntax-dynamic-import'],

                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                modules: false,
                            },
                        ],
                    ],
                },
            },
        ],
    },

    plugins: [
        new webpack.ProgressPlugin(),
        new webpack.EnvironmentPlugin(['NODE_ENV', 'TARGET_BROWSER']),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                path.join(process.cwd(), `extension/${targetBrowser}`),
                path.join(process.cwd(), `extension/${targetBrowser}.${getExtensionFileType(targetBrowser)}`),
            ],
            cleanStaleWebpackAssets: false,
            verbose: true,
        }),
        new CopyWebpackPlugin([{ from: 'src/assets', to: 'assets' }]),
        new WriteWebpackPlugin([{ name: manifest.name, data: Buffer.from(manifest.content) }]),
        extensionReloaderPlugin,
    ],

    optimization: {
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true,
            }),
            new ZipPlugin({
                path: path.resolve(__dirname, 'extension'),
                extension: `${getExtensionFileType(targetBrowser)}`,
                filename: `${targetBrowser}`,
            }),
        ],
    },
};
