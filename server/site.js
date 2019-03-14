const express = require('express');
const bodyParser = require('body-parser');
const wpcom = require('wpcom')(/* auth token */);
const Cache = require('./utils/cache');

const router = express.Router();
const blog = wpcom.site('hursleyfit52.wordpress.com');
const cache = new Cache();

router.use(bodyParser.json());

router.get('/posts', async (req, res) => {
  const posts = await cache.get('posts', blog.postsList({ number: 10 }));

  return res.json(posts.data.posts.map(post => ({
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
  const { id } = req.params;
  const key = `Page_${id}`;
  if (req.query.invalidateCache) {
    console.log(`Invalidating cache ${key}`);
    cache.invalidate(key);
  }
  try {
    /* eslint-disable camelcase */
    const data = await cache.get(key, () => blog.post({ slug: id }).get());
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
