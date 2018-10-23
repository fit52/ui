const express = require('express');

const app = express();
const path = require('path');
const cors = require('cors');

require('dotenv').config();

app.use(cors());

app.use('/api/site', require('./site'));
app.use('/api/run', require('./runapi'));

const port = process.env.PORT || 3001;

if (process.env.NODE_ENV !== 'development') {
  const buildPath = path.join(__dirname, '../build');
  console.log(`Serving the static files via express on ${buildPath}`);
  app.use(express.static(buildPath));
}

app.listen(port, () => console.log(`Server listening on port ${port}`));
