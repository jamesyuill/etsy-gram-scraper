# Etsy Scraper -> Instagram Poster

![etsy-insta-scraper smaller](https://github.com/jamesyuill/etsy-gram-scraper/assets/130482796/cfbf922c-6f36-47f1-926e-872809eadd03)


A program to automate the process of regularly posting items from a drop shipping clothing site to an instagram account.

### Tech used:
- Node/Express server
- Puppeteer for the scraping
- Instagram-Private-API to login and post to Instagram
- Node-Cron for the cron jobs
- Blender to create the designs

### How to use:

- clone the repo

    ```git clone <insert git repo url here>```

- npm install

    ```npm install```

- create a .env file - this needs to have the variables - **INSTAGRAM_USERNAME**, **INSTAGRAM_PASSWORD** & **ETSY_URL**

    ```touch .env```
  
- run it locally - there is code at the bottom of app.js which if uncommented will override the cron jobs and execute

    ```npm run dev```


### Read more:

[LinkedIn Article](https://www.linkedin.com/pulse/my-etsy-instagram-scraper-james-yuill-4rnee/?trackingId=eZbw9EPtTteKBaReMVDS%2Fg%3D%3D)
