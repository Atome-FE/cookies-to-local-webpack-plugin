const puppeteer = require('puppeteer');
const chrome = require('chrome-cookies-secure');

class AutoFillCookie {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    const { enable, targetUrl, localPort, args = [] } = this.options
    compiler.hooks.done.tap('AutoFillCookie', () => {
      if (enable) {
        chrome.getCookies(targetUrl, async (err, cookies) => {
          try {
            if (err) throw err
            console.log(cookies);
            const browser = await puppeteer.launch({
              ignoreDefaultArgs: ['--mute-audio'],
              headless: false,
              args,
            });

            const page = await browser.newPage();
            await page.setViewport({
              width: 1920,
              height: 1080
            });
            await page.goto(`http://localhost:${localPort}`);
            const transferCookies = Object.keys(cookies).map(x => ({
              name: x,
              value: cookies[x],
            }))

            await page.setCookie(...transferCookies);
            await page.reload({
              waitUntil: ["networkidle0", "domcontentloaded"]
            });
          } catch (err) {
            console.log(err);
          }
        });
      }
  })
  }
}

module.exports = AutoFillCookie
