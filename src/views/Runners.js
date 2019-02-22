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
            <PaginationV2
              page={page}
              totalItems={runnerData.total}
              pageSize={PAGE_SIZE}
              onChange={this.onPaginationChange}
              pageSizes={[PAGE_SIZE]}
            />
            <Table
              showHead={false}
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