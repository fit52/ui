import './Runners.scss';

import React, { useState, useEffect } from 'react';
import { PaginationV2 } from 'carbon-components-react';

import Spinner from '../components/Spinner';
import Table from '../components/Table';

import { getRunners } from '../services/api';

const PAGE_SIZE = 30;
const COLUMNS = [
  { header: 'Runner', key: 'name' },
  { header: '2K', key: 'no2k' },
  { header: '5K', key: 'no5k' },
  { header: 'Total', key: 'total' },
  { header: '2K PB', key: 'pb2k' },
  { header: '5K PB', key: 'pb5k' },
  { header: '#PBs', key: 'noPbs' },
  { header: 'Best AG', key: 'ageGrade' },
];

const Runners = () => {
  const [runnerData, setRunnerData] = useState({});
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getRunners(PAGE_SIZE, (page - 1) * PAGE_SIZE + 1).then(newRunnerData => {
      setRunnerData(newRunnerData);
      setLoading(false);
    });
  }, [page]);

  return (
    <div>
      <Spinner loading={loading} />
      {runnerData.runners && (
        <div className="Runners">
          <h2>All runners</h2>
          <Table className="Runners-table" rows={runnerData.runners} headers={COLUMNS} />
          <PaginationV2
            page={page}
            totalItems={runnerData.total}
            pageSize={PAGE_SIZE}
            onChange={({ page: newPage }) => setPage(newPage)}
            pageSizes={[PAGE_SIZE]}
          />
        </div>
      )}
    </div>
  );
};

export default Runners;
