import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const formatAgeGrade = (ageGrade) => {
  let agePercentage = ageGrade;
  if (typeof ageGrade === 'number' && ageGrade < 1) {
    agePercentage = (ageGrade * 100).toFixed(2);
  }
  return `${agePercentage}%`;
};

export const formatRunner = runnerData => ({
  ...runnerData,
  eventList: runnerData.eventList.map(event => ({
    ...event,
    timeString: `${moment.duration(event.time).format('m:s')}  ${event.pb ? ' (PB)' : ''}`,
    ageGradePercent: formatAgeGrade(event.ageGrade),
    id: event.event.date,
    eventTime: new Date(event.event.date).getTime(),
    eventName: (
      <Link to={`/events/${event.event.number}`}>
        {moment(event.event.date).format('MMMM Do YYYY')}
      </Link>),
  })).sort((a, b) => (a.eventTime < b.eventTime ? 1 : -1)),
});

export const formatEvent = eventData => ({
  ...eventData,
  dateString: moment(eventData.date).format('MMMM Do YYYY'),
  results: eventData.results.map(result => ({
    ...result,
    ageGrade: formatAgeGrade(result.ageGrade),
    timeString: moment.duration(result.time).format('m:s'),
    runner: (<Link to={`/runners/${result.uuid}`}>{result.name}</Link>),
    id: result.uuid,
  })),
});
