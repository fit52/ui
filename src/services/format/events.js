import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Tag } from 'carbon-components-react';
import {
  formatAgeGrade,
  runnerTimeFormat,
  pbTag,
} from './util';

export const formatEvent = (eventData) => {
  const formatResult = (result, index) => ({
    ...result,
    pos: index + 1,
    ageGrade: {
      value: formatAgeGrade(result.ageGrade),
      sortValue: result.ageGrade,
    },
    timeString: {
      value: (
        <React.Fragment>
          {moment.duration(result.time).format(runnerTimeFormat)}
          {result.pb && pbTag}
        </React.Fragment>
      ),
      sortValue: moment.duration(result.time).valueOf(),
    },
    runner: {
      value: (
        <Link className="bx--link" to={`/runners/${result.uuid}`}>
          <span>{result.name}</span>
          {result.firstEvent && <Tag className="PB-tag" type="ibm" title="First time">FT</Tag>}
        </Link>),
      sortValue: result.name,
    },
    id: result.uuid,
  });

  const allResults = eventData.results.sort((a, b) => a.pos - b.pos);
  const results2k = allResults.filter(result => result.distance === 2).map(formatResult);
  const results5k = allResults.filter(result => result.distance === 5).map(formatResult);

  return {
    ...eventData,
    dateString: moment(eventData.date).format('MMMM Do YYYY'),
    results2k,
    results5k,
  };
};

export const formatEvents = events => events.map(event => ({
  ...event,
  ...event.counts,
  title: moment(event.date).format('MMMM Do YYYY'),
  firstTimes: event.counts.firstTimers || event.counts.firstTimes,
  id: event.number.toString(),
  name: {
    value: (
      <Link className="bx--link" to={`/events/${event.number}`}>
        <span>{moment(event.date).format('MMMM Do YYYY')}</span>
      </Link>
    ),
    sortValue: moment(event.date).valueOf(),
  },
}));
