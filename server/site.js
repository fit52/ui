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
  try {
    /* eslint-disable camelcase */
    console.log('Getting page', req.params.id);
    const data = await blog.post({ slug: req.params.id }).get();
    const { title, content, post_thumbnail } = data;
    const pictureUrl = post_thumbnail ? post_thumbnail.URL : undefined;
    return res.json({ title, content, pictureUrl });
  } catch (e) {
    console.error(e);
    return res.status(404).json({
      message: 'Page not found',
    });
  }
});

module.exports = router;
