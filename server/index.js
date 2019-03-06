const express = require('express');
const compression = require('compression');
const morgan = require('morgan');
const helmet = require('helmet');

const app = express();
const path = require('path');
const cors = require('cors');

require('dotenv').config();

app.use(cors(), helmet(), morgan('dev'), compression());
app.use('/api/site', require('./site'));
app.use('/api/run', require('./runapi'));

const port = process.env.PORT || 3001;

if (process.env.NODE_ENV !== 'development') {
  const buildPath = path.join(__dirname, '../build');
  console.log(`Serving the static files via express on ${buildPath}`);
  app.use(express.static(buildPath));
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
  });
}

app.listen(port, () => console.log(`Server listening on port ${port}`));
