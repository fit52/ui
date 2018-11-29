import React from 'react';
import { Link } from 'react-router-dom';
import Spinner from './Spinner';

import api from '../services/api';

export default class Events extends React.Component {
  state = {
    events: [],
    loading: true,
  };

  componentDidMount() {
    api.getEvents()
      .then(events => this.setState({ events, loading: false }));
  }

  render() {
    const { events, loading } = this.state;

    return (
      <div>
        <Spinner loading={loading} />
        {events.length > 0 && (
          <div className="Events">
            <h3>Recent events</h3>
            <ul>
              {events.map(event => (
                <li key={event.id}>
                  <Link to={`/events/${event.number}`}>
                    {event.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}
