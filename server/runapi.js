const Cloudant = require('@cloudant/cloudant');
const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');

const router = express.Router();
router.use(bodyParser.json());

const cloudant = Cloudant({
  url: config.get('database.url'),
  plugins: 'promises',
}, () => {
  console.log('connected to database');
});

const db = cloudant.db.use('fit52results');

router.get('/global', async (req, res) => {
  try {
    const data = await db.get('global_records');
    const { _id, _rev, ...records } = data;
    return res.json(records);
  } catch (e) {
    return res.status(500).send('An error occured');
  }
});

router.get('/events', async (req, res) => {
  const { limit } = req.query;
  let data;

  try {
    data = await db.list();
  } catch (e) {
    return res.status(404).send();
  }
  const events = [];
  const maxEvents = parseInt(limit, 10);


  for (const row of data.rows) {
    if (row.id.startsWith('event/')) {
      const { _id, _rev, ...event } = await db.get(row.id);
      events.push(event);

      if (events.length >= maxEvents) {
        break;
      }
    }
  }
  return res.json(events);
});

router.get('/events/:id', async (req, res) => {
  const { id } = req.params;
  let data;

  try {
    data = await db.get(`event/${id}`);
  } catch (e) {
    return res.status(404).send();
  }

  const { _id, _rev, ...event } = data;
  return res.json(event);
});

module.exports = router;
