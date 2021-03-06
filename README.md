<h1 align="center">💻 just-YouTube</h1>
<p align="center">Extension to show only YouTube results in Google Videos Search based on <b>Levelsio's <a href="https://twitter.com/levelsio/status/1226061048060334080" target="_blank">Tweet</a></b></p>
<div align="center">
  <a href="https://travis-ci.com/abhijithvijayan/just-YouTube">
    <img src="https://travis-ci.com/abhijithvijayan/just-YouTube.svg?branch=master" alt="Travis Build" />
  </a>
  <a href="https://github.com/abhijithvijayan/just-YouTube/releases/latest">
    <img src="https://img.shields.io/github/release/abhijithvijayan/just-YouTube.svg?colorB=blue" alt="Releases" />
  </a>
  <a href="https://github.com/abhijithvijayan/just-YouTube/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/abhijithvijayan/just-YouTube.svg" alt="LICENSE" />
  </a>
</div>
<h3 align="center">🙋‍♂️ Made by <a href="https://twitter.com/_abhijithv">@abhijithvijayan</a></h3>
<p align="center">
  Donate:
  <a href="https://www.paypal.me/iamabhijithvijayan" target='_blank'><i><b>PayPal</b></i></a>,
  <a href="https://www.patreon.com/abhijithvijayan" target='_blank'><i><b>Patreon</b></i></a>
</p>
<p align="center">
  <a href='https://www.buymeacoffee.com/abhijithvijayan' target='_blank'>
    <img height='36' style='border:0px;height:36px;' src='https://bmc-cdn.nyc3.digitaloceanspaces.com/BMC-button-images/custom_images/orange_img.png' border='0' alt='Buy Me a Coffee' />
  </a>
</p>
<hr />

![demo](demo.png)

## Browser Support

| [![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png)](/) | [![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png)](/) | [![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png)](/) | [![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png)](/) | [![Yandex](https://raw.github.com/alrra/browser-logos/master/src/yandex/yandex_48x48.png)](/) | [![Brave](https://raw.github.com/alrra/browser-logos/master/src/brave/brave_48x48.png)](/) | [![vivaldi](https://raw.github.com/alrra/browser-logos/master/src/vivaldi/vivaldi_48x48.png)](/) |
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 49 & later ✔ | 52 & later ✔ | 36 & later ✔ | 79 & later ✔ | Latest ✔ | Latest ✔ | Latest ✔

##  Download for browser(s)

  - Firefox: [just YouTube :: Add-ons for Firefox](https://addons.mozilla.org/firefox/addon/just-youtube/)
  - Other Browsers: [Download from releases](https://github.com/abhijithvijayan/just-YouTube/releases)

## Template

- [abhijithvijayan/web-extension-starter](https://github.com/abhijithvijayan/web-extension-starter)

## 🚀 Quick Start

Ensure you have 
- [Node.js](https://nodejs.org) 10 or later installed
- [Yarn](https://yarnpkg.com) v1 or v2 installed

Then run the following:
- `yarn install` to install dependencies.
- `yarn run dev:chrome` to start the development server for chrome extension
- `yarn run dev:firefox` to start the development server for firefox addon
- `yarn run dev:opera` to start the development server for opera extension
- `yarn run build:chrome` to build chrome extension
- `yarn run build:firefox` to build firefox addon
- `yarn run build:opera` to build opera extension
- `yarn run build` builds and packs extensions all at once to extension/ directory

### Development

- `yarn install` to install dependencies.
- To watch file changes in developement

  - Chrome
    - `yarn run dev:chrome`
  - Firefox
    - `yarn run dev:firefox`
  - Opera
    - `yarn run dev:opera`

- **Load extension in browser**

  - ### Chrome

    - Go to the browser address bar and type `chrome://extensions`
    - Check the `Developer Mode` button to enable it.
    - Click on the `Load Unpacked Extension…` button.
    - Select your extension’s extracted directory.

  - ### Firefox

    - Load the Add-on via `about:debugging` as temporary Add-on.
    - Choose the `manifest.json` file in the extracted directory

  - ### Opera

    - Load the extension via `opera:extensions`
    - Check the `Developer Mode` and load as unpacked from extension’s extracted directory.
   

### Production

- `yarn run build` builds the extension for all the browsers to `extension/BROWSER` directory respectively.

## Show your support

Give a ⭐️ if this project helped you!

## Licence

Code released under the [MIT License](LICENSE).

