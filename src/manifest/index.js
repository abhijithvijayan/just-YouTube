const pkg = require('../../package.json');

const manifestInput = {
    manifest_version: 2,
    name: 'just YouTube',
    version: pkg.version,

    icons: {
        '16': 'assets/icons/favicon-16.png',
        '32': 'assets/icons/favicon-32.png',
        '48': 'assets/icons/favicon-48.png',
        '128': 'assets/icons/favicon-128.png',
    },

    description: 'Extension to show only YouTube results in Google Videos Search',
    homepage_url: 'https://github.com/abhijithvijayan/just-YouTube.git',
    short_name: 'Sample Name',

    content_security_policy: "script-src 'self' 'unsafe-eval'; object-src 'self'",

    '__chrome|firefox__author': 'abhijithvijayan',
    __opera__developer: {
        name: 'abhijithvijayan',
    },

    __chrome__minimum_chrome_version: '49',
    __opera__minimum_opera_version: '36',

    content_scripts: [
        {
            matches: ['https://*.google.com/search*', 'https://*.google.de/search*'],
            js: ['js/filter_youtube.bundle.js'],
        },
    ],
};

module.exports = manifestInput;
