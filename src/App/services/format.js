import React from 'react';
import { Link } from 'react-router-dom';
import { Tag } from 'carbon-components-react';
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
    timeString: (
      <React.Fragment>
        <span>{moment.duration(event.time).format('m:s')}</span>
        {event.pb && <Tag className="PB-tag" type="ibm" title="Personal Best">PB</Tag>}
      </React.Fragment>
    ),
    ageGradePercent: formatAgeGrade(event.ageGrade),
    id: event.event.date,
    eventTime: new Date(event.event.date).getTime(),
    eventName: (
      <Link className="bx--link" to={`/events/${event.event.number}`}>
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
    timeString: (
      <React.Fragment>
        <span>{moment.duration(result.time).format('m:s')}</span>
        {result.pb && <Tag className="PB-tag" type="ibm" title="Personal Best">PB</Tag>}
      </React.Fragment>
    ),
    runner: (<Link className="bx--link" to={`/runners/${result.uuid}`}>{result.name}</Link>),
    id: result.uuid,
  })),
});
