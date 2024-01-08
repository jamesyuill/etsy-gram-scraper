import puppeteer from 'puppeteer';
import fs from 'fs';

const getEtsyDetails = async () => {
  let lastPost;
  fs.readFile('data/lastPost.json', 'utf-8', (err, data) => {
    lastPost = JSON.parse(data);
    console.log('lastPost: ', lastPost);
  });

  const browser = await puppeteer.launch({
    headless: 'new',
  });

  const page = await browser.newPage();
  await page.goto('https://www.etsy.com/uk/shop/EverythingIsNoise');
  await page.waitForSelector('div');
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
  const totalItems = await page.$$eval('#section-menu', (elements) => {
    return elements.map((element) => {
      const pattern = /\d/g;
      const number = element.innerText.match(pattern);

      return number;
    });
  });

  await browser.close();

  let randomIndex = Math.floor(Math.random() * totalItems[0] + 1);

  const item = data[randomIndex];

  if (item.content === lastPost.content) {
    getEtsyDetails();
  }

  return item;
};

export default getEtsyDetails;
