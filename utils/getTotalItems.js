import puppeteer from 'puppeteer';

export default async function getTotalItems() {
  const browser = await puppeteer.launch({
    headless: 'new',
  });
  try {
    const page = await browser.newPage();
    await page.goto('https://www.etsy.com/uk/shop/EverythingIsNoise');

    await page.waitForSelector('.section-dropdown');
    const totalItems = await page.evaluate(() => {
      const element = document.querySelector('.section-dropdown');
      const pattern = /\d/g;
      return element ? element.innerText.match(pattern)[0] : null;
    });

    return +totalItems;
  } catch (error) {
    console.log(error);
  } finally {
    await browser.close();
  }
}
