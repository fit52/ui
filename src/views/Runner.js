import './Runner.scss';

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb, BreadcrumbItem } from 'carbon-components-react';
import { getRunner } from '../services/api';
import Spinner from '../components/Spinner';
import Table from '../components/Table';

const COLUMNS = [
  { header: 'Event', key: 'eventName' },
  { header: 'Position', key: 'pos' },
  { header: 'Distance (K)', key: 'distance' },
  { header: 'Time (mm:ss)', key: 'timeString' },
  { header: 'Age Grade', key: 'ageGradePercent' },
];

const Runner = ({
  match: {
    params: { runnerId },
  },
}) => {
  const [runner, setRunner] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRunner(runnerId).then(runnerData => {
      setRunner(runnerData);
      setLoading(false);
    });
  }, [runnerId]);

  return (
    <div>
      <Spinner loading={loading} />
      {runner && (
        <div className="Runner">
          <Breadcrumb noTrailingSlash className="Runner-breadcrumb">
            <BreadcrumbItem href="/runners">Runners</BreadcrumbItem>
            <BreadcrumbItem href={`/runners/${runner.uuid}`}>{runner.fullname}</BreadcrumbItem>
          </Breadcrumb>

          <h1>{runner.fullname}</h1>

          <section className="Runner-stats">
            <p>Number of 2K runs: {runner.stats.no2k}</p>
            <p>Number of 5K runs: {runner.stats.no5k}</p>
            <p>Number of personal bests: {runner.stats.noPbs}</p>
            <p>Number of times run: {runner.stats.noTotalEvents}</p>
          </section>

          <h1>Results</h1>

          <Table rows={runner.eventList} headers={COLUMNS} />
        </div>
      )}
    </div>
  );
};

Runner.propTypes = {
  match: PropTypes.object.isRequired,
};

export default Runner;
