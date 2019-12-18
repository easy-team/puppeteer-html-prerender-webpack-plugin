'use strict';
const expect = require('chai').expect;

// http://chaijs.com/api/bdd/
const puppeteer = require('../lib/puppeteer');
const layout = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>`
describe('puppeteer.test.js', () => {
  before(() => {
  });

  after(() => {
  });

  beforeEach(() => {
  });

  afterEach(() => {
  });

  describe('#puppeteer render test', () => {
    it('should get all rendered content', async () => {
      // expect(true).to.be.true;
      // expect(false).to.be.false;
      // expect(undefined).to.be.undefined;
      // expect([1,2,3]).to.have.property(1);
      // expect(['.js','.jsx','.vue']).to.include.members(['.js','.jsx']);
      // expect({id: 1, name: 'sky'}).to.include.all.keys(['id', 'name']);
      // expect(lib).to.have.property('test');
      const html = await puppeteer.evaluate({ 
        url: 'http://49.233.172.37:7001/csr',
      });
      expect(html).to.include('<title>Egg + React</title>');
      expect(html).to.include('<div id="app">');
    });
    it('should get csr rendered content', async () => {
      const html = await puppeteer.evaluateHTMLRender(layout, {
        deubg: true,
        url: 'http://49.233.172.37:7001/csr',
        selector: '#app',
        waitSelector: '#app',
      });
      expect(html).to.not.include('<title>Egg + React</title>');
      expect(html).to.include('<div id="app">');
      expect(html).to.include('class="easy-menu easy-menu-default easy-menu-custom easy-menu-fixed-top"');
    });
    it('should get rendered not include selector self content', async () => {
      const html = await puppeteer.evaluateHTMLRender(layout, {
        url: 'http://49.233.172.37:7001/csr',
        selector: '#app',
        waitSelector: '#app',
        selectorOuterHTML: false
      });
      expect(html).to.not.include('<title>Egg + React</title>');
      expect(html).to.not.include('<div id="app">');
      expect(html).to.include('class="easy-menu easy-menu-default easy-menu-custom easy-menu-fixed-top"');
    });
  });
});