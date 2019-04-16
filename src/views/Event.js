import './Event.scss';

import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb, BreadcrumbItem } from 'carbon-components-react';
import cloneDeep from 'lodash.clonedeep';

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
    { header: 'Runner', key: 'runner' },
    { header: 'Times run', key: 'noEvents' },
    { header: 'Time (mm:ss)', key: 'timeString' },
    { header: 'Age Grade', key: 'ageGrade' },
  ];

  columns2k = cloneDeep(this.columns);

  columns5k = cloneDeep(this.columns);

  async componentDidMount() {
    const { match: { params: { eventId } } } = this.props;
    const [event, page] = await Promise.all([getEvent(eventId), getPage(`run${eventId}`)]);
    this.columns2k[1].header = `Runner (${event.results2k.length})`;
    this.columns5k[1].header = `Runner (${event.results5k.length})`;
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
                <section className="Event-post wp-content" dangerouslySetInnerHTML={{ __html: page.content }} />
                <HeaderImage imageUrl={page.pictureUrl} />
              </React.Fragment>
            )}

            <h2>2K Results</h2>
            <Table
              rows={event.results2k}
              headers={this.columns2k}
            />

            <h2>5K Results</h2>
            <Table
              rows={event.results5k}
              headers={this.columns5k}
            />
          </div>
        )}
      </div>
    );
  }
}
