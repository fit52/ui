const Cloudant = require('@cloudant/cloudant');
const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');

const router = express.Router();
router.use(bodyParser.json());

let db;

const cloudant = Cloudant({
  url: config.get('database.url'),
  plugins: 'promises',
}, () => {
  console.log('connected to database');
  db = cloudant.db.use('fit52results');
});

router.get('/global', async (req, res) => {
  try {
    const data = await db.get('global_records');
    const { _id, _rev, ...records } = data;
    return res.json(records);
  } catch (e) {
    return res.status(500).send('An error occured');
  }
});

/*
For this search string to work, make sure the database has this search index:

{
   "index": {
      "fields": [
         "number",
         "_id"
      ]
   },
   "name": "event-index",
   "type": "json"
}
*/

router.get('/events', async (req, res) => {
  const { limit } = req.query;
  const maxEvents = parseInt(limit, 10);
  let data;

  try {
    data = await db.find({
      selector: {
        _id: {
          $regex: '^event/',
        },
      },
      sort: [{ number: 'desc' }],
      limit: maxEvents,
    });
  } catch (e) {
    console.error(e);
    return res.status(404).send();
  }

  return res.json(data.docs);
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
