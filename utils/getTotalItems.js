import puppeteer from 'puppeteer';
let attempts = 0;
export default async function getTotalItems() {
  let totalItems;
  const browser = await puppeteer.launch({
    headless: 'new',
  });

  const page = await browser.newPage();
  await page.goto('https://www.etsy.com/uk/shop/EverythingIsNoise', {
    waitUntil: 'load',
  });

  totalItems = await page.evaluate(() => {
    const element = document.querySelector('.section-dropdown');
    const pattern = /(\d+)/g;
    return element ? +element.innerText.match(pattern)[0] : null;
  });

  await browser.close();

  while (totalItems === null && attempts < 10) {
    console.log(`totalItems is: `, totalItems);
    totalItems = await getTotalItems();
    attempts++;
  }
  attempts = 0;
  console.log('totalItems is: ', totalItems);
  return totalItems;
}
