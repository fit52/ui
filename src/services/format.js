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
          {event.firstEvent && <Tag className="PB-tag" type="ibm" title="First time">FT</Tag>}
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
  firstTimes: event.counts.firstTimers || event.counts.firstTimes,
  id: event.number.toString(),
  name: {
    value: (
      <Link className="bx--link" to={`/events/${event.number}`}>
        <span>{event.title}</span>
      </Link>
    ),
    sortValue: moment(event.date).valueOf(),
  },
}));

const formatRecord = record => ({
  ...record,
  ageGrade: formatAgeGrade(record.ageGrade),
  id: record.uuid,
  runner: {
    value: (
      <Link className="bx--link" to={`/runners/${record.uuid}`}>
        <span>{record.name}</span>
        {record.firstEvent && <Tag className="PB-tag" type="ibm" title="First time">FT</Tag>}
      </Link>),
    sortValue: record.name,
  },
  eventName: {
    value: (
      <Link className="bx--link" to={`/events/${record.event.number}`}>
        {moment(record.event.date).format('MMMM Do YYYY')}
      </Link>
    ),
    sortValue: moment(record.event.date).valueOf(),
  },
  timeString: {
    value: (
      <React.Fragment>
        {moment.duration(record.time).format(runnerTimeFormat)}
        {record.pb && pbTag}
      </React.Fragment>
    ),
    sortValue: moment.duration(record.time).valueOf(),
  },
});

export const formatRecords = records => ({
  ageGrade: records.ageGrade.map(formatRecord),
  fastest2kfemale: records.fastest2k.female.map(formatRecord),
  fastest2kmale: records.fastest2k.male.map(formatRecord),
  fastest5kfemale: records.fastest5k.female.map(formatRecord),
  fastest5kmale: records.fastest5k.male.map(formatRecord),
});

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
