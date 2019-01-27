import React from 'react';
import { Link } from 'react-router-dom';
import { Tag } from 'carbon-components-react';
import moment from 'moment';

const runnerTimeFormat = 'mm:ss';
const pbTag = (<Tag className="PB-tag" type="ibm" title="Personal Best">PB</Tag>);

const normaliseAgeGrade = (ageGrade) => {
  let normalAge = ageGrade;
  if (typeof ageGrade === 'number' && ageGrade < 1) {
    normalAge = (ageGrade * 100).toFixed(2);
  }
  return normalAge;
};

const formatAgeGrade = ageGrade => `${normaliseAgeGrade(ageGrade)}%`;

export const formatRunner = runnerData => ({
  ...runnerData,
  eventList: runnerData.eventList.map(event => ({
    ...event,
    timeString: {
      value: (
        <React.Fragment>
          {moment.duration(event.time).format(runnerTimeFormat)}
          {event.pb && pbTag}
        </React.Fragment>
      ),
      sortValue: moment.duration(event.time).valueOf(),
    },
    ageGradePercent: {
      value: formatAgeGrade(event.ageGrade),
      sortValue: parseFloat(normaliseAgeGrade(event.ageGrade)),
    },
    id: event.event.date,
    eventName: {
      value: (
        <Link className="bx--link" to={`/events/${event.event.number}`}>
          {moment(event.event.date).format('MMMM Do YYYY')}
        </Link>
      ),
      sortValue: moment(event.event.date).valueOf(),
    },
  })).sort((a, b) => (a.eventTime < b.eventTime ? 1 : -1)),
});

export const formatEvent = eventData => ({
  ...eventData,
  dateString: moment(eventData.date).format('MMMM Do YYYY'),
  results: eventData.results.map(result => ({
    ...result,
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
  })).sort((a, b) => (a.name < b.name ? -1 : 1)),
});

export const formatEvents = events => events.map(event => ({
  ...event,
  ...event.counts,
  firstTimes: event.counts.firstTimers || event.counts.firstTimes,
  id: event.number,
  name: {
    value: (
      <Link className="bx--link" to={`/events/${event.number}`}>
        <span>{event.title}</span>
      </Link>
    ),
    sortValue: moment(event.date).valueOf(),
  },
}));

export const sortCellValues = (cellA, cellB, info) => {
  const {
    compare, locale, sortDirection, sortStates,
  } = info;

  const sortA = cellA.sortValue ? cellA.sortValue : cellA;
  const sortB = cellB.sortValue ? cellB.sortValue : cellB;

  if (sortDirection === sortStates.DESC) {
    return compare(sortB, sortA, locale);
  }

  return compare(sortA, sortB, locale);
};

export const formatTableCell = cellValue => (cellValue.value ? cellValue.value : cellValue);