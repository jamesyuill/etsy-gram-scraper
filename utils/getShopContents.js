import puppeteer from 'puppeteer';
let attempts = 0;

export default async function getShopContents() {
  let data;
  const browser = await puppeteer.launch({
    headless: 'new',
  });

  const page = await browser.newPage();
  await page.goto(process.env.ETSY_URL, {
    waitUntil: 'load',
  });

  data = await page.evaluate(() => {
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
  await browser.close();

  while (data.length === 0 && attempts < 10) {
    console.log(`data is: `, data);
    data = await getShopContents();
    attempts++;
  }
  attempts = 0;
  return data;
}
