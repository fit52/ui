const express = require('express');
const app = express();

const site = require('./site');

const port = process.env.PORT || 3001;

app.use('/api/site', site);

if (process.env.NODE_ENV !== 'dev') {
  console.log('Serving the static files via express');
  app.use(express.static('build'));
}

app.listen(port, () => console.log(`Server listening on port ${port}`));