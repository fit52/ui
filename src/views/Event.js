import './Event.scss';

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb, BreadcrumbItem } from 'carbon-components-react';

import { getEvent, getPage } from '../services/api';
import Spinner from '../components/Spinner';
import Table from '../components/Table';
import HeaderImage from '../components/HeaderImage';

const baseColumns = [
  { header: 'Position', key: 'pos' },
  { header: 'Runner', key: 'runner' },
  { header: 'Times run', key: 'noEvents' },
  { header: 'Time (mm:ss)', key: 'timeString' },
  { header: 'Age Grade', key: 'ageGrade' },
];

const Events = ({
  match: {
    params: { eventId },
  },
}) => {
  const [page, setPage] = useState(null);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [columns, setColumns] = useState({});

  useEffect(() => {
    (async () => {
      const [newEvent, newPage] = await Promise.all([getEvent(eventId), getPage(`run${eventId}`)]);
      const newColumns = {
        twok: baseColumns.map(item => ({
          ...item,
          header: item.header === 'Runner' ? `Runner (${newEvent.results2k.length})` : item.header,
        })),
        fivek: baseColumns.map(item => ({
          ...item,
          header: item.header === 'Runner' ? `Runner (${newEvent.results5k.length})` : item.header,
        })),
      };

      setColumns(newColumns);
      setEvent(newEvent);
      setPage(newPage);
      setLoading(false);
    })();
  }, [eventId]);

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
          <Table rows={event.results2k} headers={columns.twok} />

          <h2>5K Results</h2>
          <Table rows={event.results5k} headers={columns.fivek} />
        </div>
      )}
    </div>
  );
};

Events.propTypes = {
  match: PropTypes.object.isRequired,
};

export default Events;
