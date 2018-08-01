const express = require('express');
const bodyParser = require('body-parser');
const wpcom = require('wpcom')(/* auth token */);

const router = express.Router();
const blog = wpcom.site('hursleyfit52.wordpress.com');

router.use(bodyParser.json());

const cache = {};
const ONE_DAY = 24 * 60 * 60 * 1000;

router.get('/posts', async (req, res) => {
  if (!cache.posts || Date.now() - cache.posts.timestamp > ONE_DAY) {
    cache.posts = {
      data: await blog.postsList({ number: 10 }),
      timestamp: Date.now(),
    };
  }

  return res.json(cache.posts.data.posts.map(post => ({
    id: post.ID,
    author: {
      firstName: post.author.first_name,
      lastName: post.author.last_name,
      url: post.author.avatar_URL,
    },
    content: post.content,
    title: post.title,
  })));
});

router.get('/page/:id', async (req, res) => {
  const data = await blog.post({ slug: req.params.id }).get();

  if (!data) {
    return res.status(404).send();
  }

  const { title, content, date } = data;

  return res.json({ title, content, date });
});

module.exports = router;
