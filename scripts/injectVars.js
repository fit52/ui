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
