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
  const data = await db.get('global_records');
  const { _id, _rev, ...records } = data;
  return res.json(records);
});

router.get('/events', async (req, res) => {
  const { limit } = req.query;
  const { rows } = await db.list();
  const events = [];
  const maxEvents = parseInt(limit, 10);


  for (const row of rows) {
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

module.exports = router;
