const puppeteer = require('easy-puppeteer-html');

class PuppeteerHtmlPrerenderWebpackPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.compilation.tap('PuppeteerHtmlPrerenderWebpackPlugin', compilation => {
      const htmlAfterProcesser = compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing;
      if (htmlAfterProcesser) {
        htmlAfterProcesser.tapAsync('PuppeteerHtmlPrerenderedWebpackPlugin', (htmlPlugin, cb) => {
          puppeteer.captureForHtml(htmlPlugin.html, this.options).then(html => {
            htmlPlugin.html = html;
            cb(null, htmlPlugin);
          });
        });
      }
    });
  }
}

module.exports = PuppeteerHtmlPrerenderWebpackPlugin;