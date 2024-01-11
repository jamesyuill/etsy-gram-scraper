import puppeteer from 'puppeteer';

export default async function getShopContents() {
  const browser = await puppeteer.launch({
    headless: 'new',
  });
  try {
    const page = await browser.newPage();
    await page.goto('https://www.etsy.com/uk/shop/EverythingIsNoise');
    //   await page.waitForSelector('div');

    const data = await page.$$eval(
      '.js-merch-stash-check-listing',
      (elements) => {
        return elements.map((element) => {
          const content = element.innerText;
          const imgSrc = element.querySelector('img').src;
          return { content, imgSrc };
        });
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  } finally {
    await browser.close();
  }
}
