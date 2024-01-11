import getLastPost from './getLastPost';
import getTotalItems from './getTotalItems';
import getShopContents from './getShopContents';

const getEtsyDetails = async () => {
  const lastPost = getLastPost();
  const totalItems = await getTotalItems();

  const browser = await puppeteer.launch({
    headless: 'new',
  });

  const page = await browser.newPage();
  await page.goto('https://www.etsy.com/uk/shop/EverythingIsNoise');
  // await page.waitForSelector('div');
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

  let randomIndex = Math.floor(Math.random() * totalItems[0] + 1);
  const item = data[randomIndex];

  if (item.content === lastPost.content) {
    getEtsyDetails();
  }
  console.log(item);
  return item;
};

export default getEtsyDetails;
