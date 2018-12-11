import React from 'react';
import { ClickableTile } from 'carbon-components-react';
import Spinner from './Spinner';

import api from '../services/api';

import './Events.scss';

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
        {events.length && (
          <div className="Events">
            <h3>Recent events</h3>
            <section className="bx--grid">
              <div className="bx--row">
                {events.map(event => (
                  <div className="bx--col-xs-3">
                    <ClickableTile href={`/events/${event.number}`} className="EventTile">
                      <p>{event.title}</p>
                      <p>Runners: {event.counts.total}</p>
                    </ClickableTile>
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
