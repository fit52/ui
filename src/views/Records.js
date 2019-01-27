import React from 'react';

import Spinner from '../components/Spinner';
import Table from '../components/Table';
import { getRecords } from '../services/api';

import './Events.scss';

export default class Records extends React.Component {
  state = {
    records: null,
    loading: true,
  };

  columns = [
    { header: 'Runner', key: 'runner' },
    { header: 'Distance (K)', key: 'distance' },
    { header: 'Event', key: 'eventName' },
    { header: 'Time (mm:ss)', key: 'timeString' },
    { header: 'Age Grade', key: 'ageGrade' },
  ];

  componentDidMount() {
    getRecords()
      .then(records => this.setState({ records, loading: false }));
  }

  render() {
    const { records, loading } = this.state;

    return (
      <div>
        <Spinner loading={loading} />
        {records && (
          <React.Fragment>
            <h1>Records</h1>
            <h2>Age Grade</h2>
            <Table
              rows={records.ageGrade}
              headers={this.columns}
            />

            <h2>Fastest 2K (Female)</h2>
            <Table
              rows={records.fastest2kfemale}
              headers={this.columns}
            />

            <h2>Fastest 2K (Male)</h2>
            <Table
              rows={records.fastest2kmale}
              headers={this.columns}
            />

            <h2>Fastest 5K (Female)</h2>
            <Table
              rows={records.fastest5kfemale}
              headers={this.columns}
            />

            <h2>Fastest 5K (Male)</h2>
            <Table
              rows={records.fastest5kmale}
              headers={this.columns}
            />
          </React.Fragment>
        )}
      </div>
    );
  }
}
