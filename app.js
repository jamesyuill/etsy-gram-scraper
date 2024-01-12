import express from 'express';
import fs from 'fs';
import { IgApiClient } from 'instagram-private-api';
import 'dotenv/config';
import hashtags from './data/hashtags.js';
import cron from 'node-cron';
import cors from 'cors';
import getLastPost from './utils/getLastPost.js';
import getTotalItems from './utils/getTotalItems.js';
import getShopContents from './utils/getShopContents.js';
import selectRandomItem from './utils/selectRandomItem.js';

const app = express();

app.use(cors());

const ig = new IgApiClient();

const selectItemToPost = async () => {
  const lastPost = await getLastPost();
  const totalItems = await getTotalItems();
  const shopItemsArray = await getShopContents();
  const itemToPost = selectRandomItem(shopItemsArray, totalItems);
  return itemToPost;
};

const postToInsta = async () => {
  let etsyDetails;
  try {
    etsyDetails = await selectItemToPost();
  } catch (error) {
    console.log('Error getting Etsy Details', error);
    return;
  }

  if (etsyDetails) {
    try {
      ig.state.generateDevice(process.env.INSTAGRAM_USERNAME);

      //Removed this line as it was throwing a login error
      // await ig.simulate.preLoginFlow();

      const user = await ig.account.login(
        process.env.INSTAGRAM_USERNAME,
        process.env.INSTAGRAM_PASSWORD
      );

      //Image resize and buffering
      const imageURL = etsyDetails.imgSrc.replace('il_340x270', 'il_1588xN');

      const response = await fetch(imageURL);
      const blob = await response.blob();
      const arrayBuffer = await blob.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      //caption concatenation
      const contentArray = etsyDetails.content.split('\n');
      const clothingTitle = contentArray[0];
      const caption = `This is the ${clothingTitle}\n\nOnly ${contentArray[2]}\n\nBuy it now!\n\nLink in Bio\n\n\n\n******************\n\n${hashtags}`;

      const published = await ig.publish.photo({
        file: buffer,
        caption: caption,
      });
      console.log(published.status);

      if (published.status === 'ok') {
        fs.writeFile('data/lastPost.json', JSON.stringify(etsyDetails), () => {
          console.log('lastPost written to file');
        });
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    throw new Error('Trouble fetching Etsy item details');
  }
};

postToInsta();

//Cron job for collecting Etsy Details and Posting to Instagram
cron.schedule('0 1 9 * * *', () => {
  postToInsta();
  console.log('Scraping and a Posting in the Morning');
});

cron.schedule('0 1 16 * * *', () => {
  postToInsta();
  console.log('Scraping and a Posting in the Afternoon');
});

export default app;
