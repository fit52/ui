import './Events.scss';

import React, { useState, useEffect } from 'react';

import Spinner from '../components/Spinner';
import Table from '../components/Table';
import { getRecords } from '../services/api';

const COLUMNS = [
  { header: 'Runner', key: 'runner' },
  { header: 'Distance (K)', key: 'distance' },
  { header: 'Event', key: 'eventName' },
  { header: 'Time (mm:ss)', key: 'timeString' },
  { header: 'Age Grade', key: 'ageGrade' },
];

const Records = () => {
  const [records, setRecords] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRecords().then(newRecords => {
      setRecords(newRecords);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <Spinner loading={loading} />
      {records && (
        <React.Fragment>
          <h1>Records</h1>
          <h2>Age Grade</h2>
          <Table rows={records.ageGrade} headers={COLUMNS} />

          <h2>Fastest 2K (Female)</h2>
          <Table rows={records.fastest2kfemale} headers={COLUMNS} />

          <h2>Fastest 2K (Male)</h2>
          <Table rows={records.fastest2kmale} headers={COLUMNS} />

          <h2>Fastest 5K (Female)</h2>
          <Table rows={records.fastest5kfemale} headers={COLUMNS} />

          <h2>Fastest 5K (Male)</h2>
          <Table rows={records.fastest5kmale} headers={COLUMNS} />
        </React.Fragment>
      )}
    </div>
  );
};

export default Records;
