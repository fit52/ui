import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';

import api from '../services/api';
import Spinner from './Spinner';

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
      .then((eventData) => {
        const event = {
          ...eventData,
          dateString: moment(eventData.date).format('MMMM Do YYYY'),
        };
        this.setState({ event, loading: false });
      });
  }

  render() {
    const { event, loading } = this.state;

    return (
      <div>
        <Spinner loading={loading} />
        {event && (
          <div className="Event">
            <p><Link to="/events"><MdArrowBack /><span>Events</span></Link></p>
            <h3>{event.dateString}</h3>

            <h3>Stats</h3>
            <p>Number of 2K runners: {event.counts.twok}</p>
            <p>Number of 5K runners: {event.counts.fivek}</p>
            <p>Number of first time runners: {event.counts.firstTimers}</p>
            <p>Number of volunteers: {event.counts.volunteers}</p>

            <h3>Results</h3>
            {event.results.map(result => (
              <React.Fragment key={result.name}>
                <h3>{result.name} {result.firstEvent && '(first time)'}</h3>
                <p>Position: {result.pos}</p>
                <p>Time: {result.time}</p>
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    );
  }
}
