const Cloudant = require('@cloudant/cloudant');
const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const moment = require('moment');

const Cache = require('./utils/cache');

const router = express.Router();
router.use(bodyParser.json());

let db;
const cache = new Cache();

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
  const { limit = '20', offset = '0' } = req.query;
  const maxEvents = parseInt(limit, 10);
  const offsetEvents = parseInt(offset, 10);
  let data;

  try {
    const findFunc = () => db.find({
      selector: {
        _id: {
          $regex: '^event/',
        },
      },
      fields: [
        'date',
        'number',
        'course',
        'counts',
      ],
      sort: [{ number: 'desc' }],
      limit: maxEvents,
      skip: offsetEvents,
    }).then(({ docs }) => docs.map(event => ({
      title: moment(event.date).format('MMMM Do YYYY'),
      ...event,
    })));

    data = await cache.get(`events${maxEvents}${offsetEvents}`, findFunc);
  } catch (e) {
    console.error(e);
    return res.status(404).send();
  }

  return res.json({
    events: data,
    offset: offsetEvents,
    limit: maxEvents,
  });
});


router.get('/events/:id', async (req, res) => {
  const { id } = req.params;
  let data;

  try {
    const eventId = `event/${id}`;
    const getEvent = () => db.get(eventId);
    data = await cache.get(eventId, getEvent);
  } catch (e) {
    return res.status(404).send();
  }

  const { _id, _rev, ...event } = data;
  return res.json(event);
});

/*
For this search string to work, make sure the database has this search index:

{
   "index": {
      "fields": [
         {
            "name": "_id",
            "type": "string"
         },
         {
            "name": "fullname",
            "type": "string"
         },
         {
            "name": "uuid",
            "type": "string"
         }
      ]
   },
   "name": "runner-text",
   "type": "text"
}
*/

/*
For this list to work, create view runnerView with runner-index with this reduce map
"runner-index": {
  "map": "function (doc) {\n  if(doc.fullname) {\n    emit(doc.fullname, doc.uuid);\n  }\n}"
}
*/

router.get('/runners', async (req, res) => {
  const { limit = '20', offset = '0' } = req.query;
  const maxRunners = parseInt(limit, 10);
  const offsetRunners = parseInt(offset, 10);
  let data;

  try {
    const getRunnersFunc = () => db.view('runnerView', 'runner-index', {
      limit: maxRunners,
      skip: offsetRunners,
      include_docs: true,
    });

    data = await cache.get(`runners${maxRunners}${offsetRunners}`, getRunnersFunc);
  } catch (e) {
    console.error(e);
    return res.status(404).send();
  }

  const runners = data.rows.map(({ doc }) => ({
    uuid: doc.uuid,
    fullname: doc.fullname,
    stats: doc.stats,
  })).sort((a, b) => (a.fullname < b.fullname ? -1 : 1));

  return res.json({
    runners,
    offset: data.offset,
    limit: maxRunners,
    total: data.total_rows,
  });
});

router.get('/runners/:id', async (req, res) => {
  const { id } = req.params;
  let data;

  try {
    const runnerId = `runner/${id}`;
    const getRunner = () => db.get(runnerId);
    data = await cache.get(runnerId, getRunner);
  } catch (e) {
    return res.status(404).send();
  }

  const { _id, _rev, ...runner } = data;
  const {
    eventList, stats, fullname, uuid,
  } = runner;

  return res.json({
    eventList,
    stats,
    fullname,
    uuid,
  });
});

router.get('/globalrecords', async (req, res) => {
  let data;
  try {
    const getRecords = () => db.get('global_records');
    data = await cache.get('records', getRecords);
  } catch (e) {
    return res.status(404).send();
  }

  const { _rev, _id, ...records } = data;
  return res.json({ ...records });
});

module.exports = router;
