import puppeteer from 'puppeteer';

const getEtsyDetails = async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
  });
  const page = await browser.newPage();
  await page.goto('https://www.etsy.com/uk/shop/EverythingIsNoise');
  await page.waitForSelector('#sh-wider-items');
  const data = await page.$$eval(
    '.js-merch-stash-check-listing.v2-listing-card',
    (elements) => {
      return elements.map((element) => {
        const content = element.innerText;
        const imgSrc = element.querySelector('img').src;
        return { content, imgSrc };
      });
    }
  );
  let randomIndex = Math.floor(Math.random() * 2);
  await browser.close();
  return data[randomIndex];
};

export default getEtsyDetails;
