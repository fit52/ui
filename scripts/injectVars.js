/*
This is a build script which replaces the DB_URL var in the
app manifest with the actual DB_URL environment variable specified
in the CI system (Travis) before deployment
*/

const replace = require('replace-in-file');
const path = require('path');

const options = {
  files: path.join(__dirname, '../Manifest.yml'),
  from: '$DB_URL',
  to: process.env.DB_URL,
};

replace(options)
  .then((changes) => {
    console.log('Modified files:', changes.join(', '));
  })
  .catch((error) => {
    console.error('Error occurred:', error);
  });
