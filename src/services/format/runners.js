import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Tag } from 'carbon-components-react';
import {
  runnerTimeFormat,
  normaliseAgeGrade,
  formatAgeGrade,
  pbTag,
} from './util';

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

export const formatRunners = runner => ({
  ...runner,
  id: runner.uuid,
  name: {
    value: <Link className="bx--link" to={`/runners/${runner.uuid}`}>{runner.fullname}</Link>,
    sortValue: runner.fullname,
  },
});
