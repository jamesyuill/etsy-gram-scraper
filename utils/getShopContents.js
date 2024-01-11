import puppeteer from 'puppeteer';

export default async function getShopContents() {
  const browser = await puppeteer.launch({
    headless: 'new',
  });
  try {
    const page = await browser.newPage();
    await page.goto('https://www.etsy.com/uk/shop/EverythingIsNoise');

    const data = await page.evaluate(() => {
      const results = [];
      const items = document.querySelectorAll('.js-merch-stash-check-listing');
      items.forEach((item) => {
        results.push({
          content: item.innerText,
          imgSrc: item.querySelector('img').src,
        });
      });
      return results;
    });
    return data;
  } catch (error) {
    console.log(error);
  } finally {
    await browser.close();
  }
}
