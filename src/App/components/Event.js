import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Spinner from './Spinner';

import api from '../services/api';

export default class Events extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
  }

  state = {
    event: null,
    loading: true,
  };

  componentDidMount() {
    const { match } = this.props;
    api.getEvent(match.params.eventId)
      .then(event => this.setState({ event, loading: false }));
  }

  render() {
    const { event, loading } = this.state;

    return (
      <div>
        <Spinner loading={loading} />
        {event && (
          <div className="Event">
            <h3>{moment(event.date).format('MMMM Do YYYY')}</h3>

            <h3>Stats</h3>
            <p>Number of 2K runners: {event.stats.no2k}</p>
            <p>Number of 5K runners: {event.stats.no5k}</p>
            <p>Number of first time runners: {event.stats.noFirstTimes}</p>
            <p>Number of volunteers: {event.stats.noVolunteers}</p>

          </div>
        )}
      </div>
    );
  }
}
