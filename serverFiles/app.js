import express from 'express';
import { IgApiClient } from 'instagram-private-api';
import 'dotenv/config';
import getEtsyDetails from '../utils/getEtsyDetails.js';
import hashtags from '../data/hashtags.js';
const app = express();

const port = process.env.PORT || 8080;

const etsyDetails = await getEtsyDetails();

const ig = new IgApiClient();

const postToInsta = async () => {
  try {
    ig.state.generateDevice(process.env.INSTAGRAM_USERNAME);

    await ig.simulate.preLoginFlow();
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
    const clothingTitleArray = contentArray[0].split('-');
    const caption = `Check out our new design!\nThis is the ${clothingTitleArray[0]}\nOnly ${contentArray[2]}\nBuy it now!\nLink in Bio\n\n\n\n******************\n${hashtags}`;

    const published = await ig.publish.photo({
      file: buffer,
      caption: caption,
    });
    console.log(published);
  } catch (error) {
    console.log(error);
  }
};

postToInsta();

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
