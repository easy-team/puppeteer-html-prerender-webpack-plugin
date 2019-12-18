/* eslint-disable no-shadow */
const puppeteer = require('puppeteer');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
exports.evaluate = async options => {
  const {
    url,
    selector,
    selectorOuterHTML = true,
    waitSelector,
    beforeEvaluate,
    afterEvaluate,
    debug = false
  } = options;
  const start = Date.now();
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  if (beforeEvaluate) {
    await beforeEvaluate(browser, page);
  }
  await page.goto(url);

  // must exist element node
  if (waitSelector) {
    // https://github.com/istanbuljs/nyc/issues/514
    /* istanbul ignore next */
    // eslint-disable-next-line arrow-parens
    await page.waitFor((id) => {
      /* istanbul ignore next */
      const app = document.querySelector(id);
      return app && app.childNodes.length > 0;
    }, [], waitSelector);
  }

  let html;
  if (selector) {
    if (selectorOuterHTML) {
      html = await page.$eval(selector, e => e.outerHTML);
    } else {
      html = await page.$eval(selector, e => e.innerHTML);
    }
  } else {
    html = await page.content();
  }

  if (afterEvaluate) {
    html = await afterEvaluate(browser, page, html);
  }
  await browser.close();
  if (debug) {
    console.debug(`\r\n puppeteer cost: ${Date.now() - start}ms`);
    console.debug(`\r\n puppeteer html: \r\n ${html}`);
  }
  return html;
};


exports.evaluateHTMLRender = async(html, options) => {
  const { selector, placeholder, debug } = options;
  const evaluatedHTML = await exports.evaluate(options);
  let replacePlaceholder = placeholder;
  if (selector && !placeholder) {
    const fragment = JSDOM.fragment(html);
    const dom = fragment.querySelector(selector);
    replacePlaceholder = dom.outerHTML;
    if (debug) {
      console.debug(`\r\n puppeteer selector, placeholder, replacePlaceholder: ${selector}, ${placeholder}, ${replacePlaceholder}`);
    }
  }
  if (replacePlaceholder) {
    return html.replace(replacePlaceholder, evaluatedHTML);
  }
  return evaluatedHTML;
};
