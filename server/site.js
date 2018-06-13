const express = require('express');
const bodyParser = require('body-parser');
const wpcom = require('wpcom')(/*auth token*/);

const router = express.Router();
const blog = wpcom.site( 'hursleyfit52.wordpress.com' );

router.use(bodyParser.json());

router.get('/posts', (req, res) => {
  blog.postsList({number: 8})
    .then(list => { 
      res.json(list)
    });
});

module.exports = router;