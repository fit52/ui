import React from 'react';
import Spinner from '../components/Spinner';
import Table from '../components/Table';

import { getEvents } from '../services/api';

import './Events.scss';

export default class Events extends React.Component {
  state = {
    events: [],
    loading: true,
  };

  columns = [
    { header: 'Event', key: 'name' },
    { header: '5K Runners', key: 'fivek' },
    { header: '2K Runners', key: 'twok' },
    { header: 'First Timers', key: 'firstTimes' },
  ];

  componentDidMount() {
    getEvents()
      .then(events => this.setState({ events, loading: false }));
  }

  render() {
    const { events, loading } = this.state;

    return (
      <div>
        <Spinner loading={loading} />
        {events.length > 0 && (
          <div className="Events">
            <h2>Recent events</h2>
            <Table
              rows={events}
              headers={this.columns}
            />
          </div>
        )}
      </div>
    );
  }
}
