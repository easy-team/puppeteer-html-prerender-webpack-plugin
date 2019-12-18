# puppeteer-html-prerender-webpack-plugin

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/puppeteer-html-prerender-webpack-plugin.svg?style=flat-square
[npm-url]: https://npmjs.org/package/puppeteer-html-prerender-webpack-plugin
[travis-image]: https://img.shields.io/travis/hubcarl/puppeteer-html-prerender-webpack-plugin.svg?style=flat-square
[travis-url]: https://travis-ci.org/hubcarl/puppeteer-html-prerender-webpack-plugin
[codecov-image]: https://img.shields.io/codecov/c/github/hubcarl/puppeteer-html-prerender-webpack-plugin.svg?style=flat-square
[codecov-url]: https://codecov.io/github/hubcarl/puppeteer-html-prerender-webpack-plugin?branch=master
[david-image]: https://img.shields.io/david/hubcarl/puppeteer-html-prerender-webpack-plugin.svg?style=flat-square
[david-url]: https://david-dm.org/hubcarl/puppeteer-html-prerender-webpack-plugin
[snyk-image]: https://snyk.io/test/npm/puppeteer-html-prerender-webpack-plugin/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/puppeteer-html-prerender-webpack-plugin
[download-image]: https://img.shields.io/npm/dm/puppeteer-html-prerender-webpack-plugin.svg?style=flat-square
[download-url]: https://npmjs.org/package/puppeteer-html-prerender-webpack-plugin

Implement server pre-rendering by [Puppeteer](https://github.com/puppeteer/puppeteer), including obtaining the HTML structure content rendered, support server side render(ssr) and client side render(csr) page.

## Install

npm install puppeteer-html-prerender-webpack-plugin --save-dev

## Usage

```js
const PuppeteerHtmlPrerenderPlugin = require('puppeteer-html-prerender-webpack-plugin');
module.exports = {
  plugins:[
    new PuppeteerHtmlPrerenderPlugin({
      url: 'http://49.233.172.37:7001/csr',
      selector: '#app',
      waitSelector: '#app',
      beforeEvaluate: async (browser, page) => {
        await page.setUserAgent('Mozilla/5.0 (Linux; U; Android 9; en-US) Chrome/57.0.2987.108 UCBrowser/12.12.5.1189 Mobile');
      },
      afterEvaluate: async (browser, page, html) => {
        return html;
      },
    })
  ]
}
```
 
## Configuration

PuppeteerHtmlPrerenderPlugin options:

- **url** -  prefetch render url
- **selector** { optional } - fetch selector element html. if not exist, will return all html.
- **selectorOuterHTML** { optional, default: true } - return selector self node content. 
- **waitSelector** { optional } - fetch selector element html until waiting selector element exist, the config can get the client render mode html content.
- **debug** { optional, default: false } - print puppeteer execute cost and key info
- **beforeEvaluate** { optional } - before evaluate fetch hook
- **afterEvaluate** { optional } - after evaluate fetch hook

## License

[MIT](LICENSE)
