import puppeteer from 'puppeteer';

export default async function getTotalItems() {
  const browser = await puppeteer.launch({
    headless: 'new',
  });
  try {
    const page = await browser.newPage();
    await page.goto('https://www.etsy.com/uk/shop/EverythingIsNoise');
    //   await page.waitForSelector('div');

    const totalItems = await page.$$eval('#section-menu', (elements) => {
      return elements.map((element) => {
        const pattern = /\d/g;
        const number = element.innerText.match(pattern);

        return +number;
      });
    });
    return totalItems[0];
  } catch (error) {
    console.log(error);
  } finally {
    await browser.close();
  }
}
