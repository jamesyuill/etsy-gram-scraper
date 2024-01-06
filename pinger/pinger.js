import cron from 'node-cron';
import http from 'https';

function cronJob() {
  return cron.schedule('0 */10 * * * *', function () {
    http.get('https://etsy-gram-scraper.onrender.com', (res) => {
      console.log('pinged!');
    });
  });
}

export default cronJob;
