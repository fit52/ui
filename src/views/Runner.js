import './Runner.scss';

import React from 'react';
import PropTypes from 'prop-types';
import { getRunner } from '../services/api';
import Spinner from '../components/Spinner';
import Table from '../components/Table';

export default class Runner extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
  }

  state = {
    runner: null,
    loading: true,
  };

  columns = [
    { header: 'Event', key: 'eventName' },
    { header: 'Position', key: 'pos' },
    { header: 'Distance (K)', key: 'distance' },
    { header: 'Time (mm:ss)', key: 'timeString' },
    { header: 'Age Grade', key: 'ageGradePercent' },
  ];

  componentDidMount() {
    const { match } = this.props;
    getRunner(match.params.runnerId)
      .then(runner => this.setState({ runner, loading: false }));
  }

  render() {
    const { runner, loading } = this.state;

    return (
      <div>
        <Spinner loading={loading} />
        {runner && (
          <div className="Runner">
            <h1>{runner.fullname}</h1>

            <section className="Runner-stats">
              <p>Number of 2K runs: {runner.stats.no2k}</p>
              <p>Number of 5K runs: {runner.stats.no5k}</p>
              <p>Number of personal bests: {runner.stats.noPbs}</p>
              <p>Number of times run: {runner.stats.noTotalEvents}</p>
            </section>

            <h1>Results</h1>

            <Table
              rows={runner.eventList}
              headers={this.columns}
            />
          </div>
        )}
      </div>
    );
  }
}
