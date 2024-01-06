import puppeteer from 'puppeteer';

const getEtsyDetails = async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
  });
  const page = await browser.newPage();
  await page.goto('https://www.etsy.com/uk/shop/EverythingIsNoise');
  page.waitForSelector('div');
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

  await browser.close();
  let randomIndex = Math.floor(Math.random() * 9);
  return data[randomIndex];
};

export default getEtsyDetails;
