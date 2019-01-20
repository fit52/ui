import React from 'react';
import { Link } from 'react-router-dom';
import { Tile } from 'carbon-components-react';
import Spinner from './Spinner';

import { getEvents } from '../services/api';

import './Events.scss';

export default class Events extends React.Component {
  state = {
    events: [],
    loading: true,
  };

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
            <section className="bx--grid Events-grid">
              <div className="bx--row">
                {events.map(event => (
                  <div className="bx--col-xs-3">
                    <Link to={`/events/${event.number}`}>
                      <Tile className="EventTile">
                        <p>{event.title}</p>
                        <p>Runners: {event.counts.total}</p>
                      </Tile>
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    );
  }
}
