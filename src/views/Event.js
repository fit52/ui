import './Event.scss';

import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb, BreadcrumbItem } from 'carbon-components-react';

import { getEvent } from '../services/api';
import Spinner from '../components/Spinner';
import Table from '../components/Table';

export default class Events extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
  }

  state = {
    event: null,
    loading: true,
  };

  columns = [
    { header: 'Position', key: 'pos' },
    { header: 'Name', key: 'runner' },
    { header: 'Distance (K)', key: 'distance' },
    { header: 'Times run', key: 'noEvents' },
    { header: 'Time (mm:ss)', key: 'timeString' },
    { header: 'Age Grade', key: 'ageGrade' },
  ];

  componentDidMount() {
    const { match } = this.props;
    getEvent(match.params.eventId)
      .then((event) => {
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
            <Breadcrumb noTrailingSlash className="Event-breadcrumb">
              <BreadcrumbItem href="/events">Events</BreadcrumbItem>
              <BreadcrumbItem href={`/events/${event.number}`}>{event.dateString}</BreadcrumbItem>
            </Breadcrumb>

            <section className="Event-stats">
              <h2>Stats</h2>
              <p>Number of 2K runners: {event.counts.twok}</p>
              <p>Number of 5K runners: {event.counts.fivek}</p>
              <p>Number of first time runners: {
                event.counts.firstTimers || event.counts.firstTimes }
              </p>
              <p>Number of volunteers: {event.counts.volunteers}</p>
            </section>

            <h2>Results</h2>
            <Table
              rows={event.results}
              headers={this.columns}
            />
          </div>
        )}
      </div>
    );
  }
}
