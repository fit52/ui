const express = require('express');
const app = express();

const port = process.env.PORT || 3001;

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

if (process.env.NODE_ENV !== 'dev') {
  console.log('Serving the static files via express');
  app.use(express.static('build'));
}

app.listen(port, () => console.log(`Server listening on port ${port}`));