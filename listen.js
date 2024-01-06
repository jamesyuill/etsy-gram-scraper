import app from './app.js';

import cronJob from './pinger/pinger.js';

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});

if (process.env.NODE_ENV === 'production') {
  cronJob().start();
}
