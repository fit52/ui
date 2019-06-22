import React, { useEffect, useState } from 'react';
import Spinner from '../components/Spinner';
import Table from '../components/Table';

import { getEvents } from '../services/api';

import './Events.scss';

const columns = [
  { header: 'Event', key: 'name' },
  { header: '5K Runners', key: 'fivek' },
  { header: '2K Runners', key: 'twok' },
  { header: 'First Timers', key: 'firstTimes' },
];

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEvents().then(newEvents => {
      setEvents(newEvents);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <Spinner loading={loading} />
      {events.length > 0 && (
        <div className="Events">
          <h2>Recent events</h2>
          <Table rows={events} headers={columns} />
        </div>
      )}
    </div>
  );
};

export default Events;
