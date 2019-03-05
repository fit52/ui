import React from 'react';
import { PaginationV2 } from 'carbon-components-react';

import Spinner from '../components/Spinner';
import Table from '../components/Table';

import { getRunners } from '../services/api';

import './Runners.scss';

const PAGE_SIZE = 30;

export default class Runners extends React.Component {
  state = {
    runnerData: {},
    loading: true,
    page: 1,
  };

  columns = [
    { header: 'Runner', key: 'name' },
    { header: '2K', key: 'no2k' },
    { header: '5K', key: 'no5k' },
    { header: 'Total', key: 'total' },
    { header: '2K PB', key: 'pb2k' },
    { header: '5K PB', key: 'pb5k' },
    { header: '#PBs', key: 'noPbs' },
    { header: 'Best AG', key: 'ageGrade' },
  ];

  componentDidMount() {
    this.getRunnerPage();
  }

  onPaginationChange = ({ page }) => {
    this.setState({ page }, this.getRunnerPage);
  }

  getRunnerPage = () => {
    const { page } = this.state;
    getRunners(PAGE_SIZE, ((page - 1) * PAGE_SIZE) + 1)
      .then(runnerData => this.setState({ runnerData, loading: false }));
  }

  render() {
    const { runnerData, loading, page } = this.state;

    return (
      <div>
        <Spinner loading={loading} />
        {runnerData.runners && (
          <div className="Runners">
            <h2>All runners</h2>
            <Table
              className="Runners-table"
              rows={runnerData.runners}
              headers={this.columns}
            />
            <PaginationV2
              page={page}
              totalItems={runnerData.total}
              pageSize={PAGE_SIZE}
              onChange={this.onPaginationChange}
              pageSizes={[PAGE_SIZE]}
            />
          </div>
        )}
      </div>
    );
  }
}
