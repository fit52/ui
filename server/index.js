const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

require('dotenv').config();

app.use(cors());

app.use('/api/site', require('./site'));

const port = process.env.PORT || 3001;

if (process.env.NODE_ENV !== 'dev') {
  console.log('Serving the static files via express');
  app.get('*', express.static(path.join(__dirname, 'build')));
}

app.listen(port, () => console.log(`Server listening on port ${port}`));