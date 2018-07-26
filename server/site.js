const express = require('express');
const bodyParser = require('body-parser');
const wpcom = require('wpcom')(/*auth token*/);

const router = express.Router();
const blog = wpcom.site('hursleyfit52.wordpress.com');

router.use(bodyParser.json());

router.get('/posts', async (req, res) => {
  const data = await blog.postsList({number: 10})
  return res.json(data.posts.map(post => ({
    id: post.ID,
    author: {
      firstName: post.author.first_name,
      lastName: post.author.last_name,
      url: post.author.avatar_URL
    },
    content: post.content,
    title: post.title,
  })));
});

module.exports = router;