const path = require('path');
const webpack = require('webpack');
const FilemanagerPlugin = require('filemanager-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const ExtensionReloader = require('webpack-extension-reloader');
const WextManifestWebpackPlugin = require('wext-manifest-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const sourcePath = path.join(__dirname, 'source');
const destPath = path.join(__dirname, 'extension');
const nodeEnv = process.env.NODE_ENV || 'development';
const targetBrowser = process.env.TARGET_BROWSER;
const isDevelopment = nodeEnv === 'development';

const extensionReloaderPlugin = isDevelopment
    ? new ExtensionReloader({
        port: 9090,
        reloadPage: true,
        entries: {
            // TODO: reload manifest on update
            contentScript: 'contentScript',
        },
    })
    : () => {
        this.apply = () => {};
    };

const getExtensionFileType = (browser) => {
    if (browser === 'opera') {
        return 'crx';
    }

    if (browser === 'firefox') {
        return 'xpi';
    }

    return 'zip';
};

module.exports = {
    devtool: false, // https://github.com/webpack/webpack/issues/1194#issuecomment-560382342

    stats: {
        all: false,
        builtAt: true,
        errors: true,
        hash: true,
    },

    mode: nodeEnv,

    entry: {
        manifest: path.join(sourcePath, 'manifest.json'),
        contentScript: path.join(sourcePath, 'ContentScript', 'index.ts'),
    },

    output: {
        path: path.join(destPath, targetBrowser),
        filename: 'js/[name].bundle.js',
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
        alias: {
            'webextension-polyfill-ts': path.resolve(
                path.join(__dirname, 'node_modules', 'webextension-polyfill-ts')
            ),
        },
    },

    module: {
        rules: [
            {
                type: 'javascript/auto', // prevent webpack handling json with its own loaders,
                test: /manifest\.json$/,
                use: {
                    loader: 'wext-manifest-loader',
                    options: {
                        usePackageJSONVersion: true, // set to false to not use package.json version for manifest
                    },
                },
                exclude: /node_modules/,
            },
            {
                test: /\.(js|ts)x?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
        ],
    },

    plugins: [
        // Plugin to not generate js bundle for manifest entry
        new WextManifestWebpackPlugin(),
        // Generate sourcemaps
        new webpack.SourceMapDevToolPlugin({filename: false}),
        new ForkTsCheckerWebpackPlugin(),
        // environmental variables
        new webpack.EnvironmentPlugin(['NODE_ENV', 'TARGET_BROWSER']),
        // variables defined to be included in the UI bundle
        new webpack.DefinePlugin({
            ENVIRONMENT: JSON.stringify(nodeEnv),
        }),
        // delete previous build files
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                path.join(process.cwd(), `extension/${targetBrowser}`),
                path.join(
                    process.cwd(),
                    `extension/${targetBrowser}.${getExtensionFileType(targetBrowser)}`
                ),
            ],
            cleanStaleWebpackAssets: false,
            verbose: true,
        }),
        // copy static assets
        new CopyWebpackPlugin({
            patterns: [{from: 'source/assets', to: 'assets'}],
        }),
        // plugin to enable browser reloading in development mode
        extensionReloaderPlugin,
    ],

    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                parallel: true,
                terserOptions: {
                    format: {
                        comments: false,
                    },
                },
                extractComments: false,
            }),
            new FilemanagerPlugin({
                events: {
                    onEnd: {
                        archive: [
                            {
                                format: 'zip',
                                source: path.join(destPath, targetBrowser),
                                destination: `${path.join(
                                    destPath,
                                    targetBrowser
                                )}.${getExtensionFileType(targetBrowser)}`,
                                options: {zlib: {level: 6}},
                            },
                        ],
                    },
                },
            }),
        ],
    },
};