import React from 'react';
import { Link } from 'react-router-dom';
import { Tag } from 'carbon-components-react';
import moment from 'moment';

import { pbTag, runnerTimeFormat, formatAgeGrade } from './util';

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

export default records => ({
  ageGrade: records.ageGrade.map(formatRecord),
  fastest2kfemale: records.fastest2k.female.map(formatRecord),
  fastest2kmale: records.fastest2k.male.map(formatRecord),
  fastest5kfemale: records.fastest5k.female.map(formatRecord),
  fastest5kmale: records.fastest5k.male.map(formatRecord),
});
