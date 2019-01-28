import './Event.scss';

import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb, BreadcrumbItem } from 'carbon-components-react';

import { getEvent, getPage } from '../services/api';
import Spinner from '../components/Spinner';
import Table from '../components/Table';
import HeaderImage from '../components/HeaderImage';

export default class Events extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
  }

  state = {
    page: null,
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

  async componentDidMount() {
    const { match: { params: { eventId } } } = this.props;
    const [event, page] = await Promise.all([getEvent(eventId), getPage(`run${eventId}`)]);
    this.setState({ event, page, loading: false });
  }

  render() {
    const { event, loading, page } = this.state;

    return (
      <div>
        <Spinner loading={loading} />
        {event && (
          <div className="Event">
            <Breadcrumb noTrailingSlash className="Event-breadcrumb">
              <BreadcrumbItem href="/events">Events</BreadcrumbItem>
              <BreadcrumbItem href={`/events/${event.number}`}>{event.dateString}</BreadcrumbItem>
            </Breadcrumb>

            {page && (
              <React.Fragment>
                <section className="Event-post" dangerouslySetInnerHTML={{ __html: page.content }} />
                <HeaderImage imageUrl={page.pictureUrl} />
              </React.Fragment>
            )}

            <section className="Event-stats">
              <h2>Stats</h2>
              <p>Number of 2K runners: {event.counts.twok}</p>
              <p>Number of 5K runners: {event.counts.fivek}</p>
              <p>Number of first time runners: {
                event.counts.firstTimers || event.counts.firstTimes }
              </p>
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
