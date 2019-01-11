import React from 'react';
import PropTypes from 'prop-types';
import { DataTable } from 'carbon-components-react';
import 'react-table/react-table.css';

import api from '../services/api';
import Spinner from './Spinner';

const {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableHeader,
} = DataTable;

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
    api.getRunner(match.params.runnerId)
      .then(runner => this.setState({ runner, loading: false }));
  }

  render() {
    const { runner, loading } = this.state;

    return (
      <div>
        <Spinner loading={loading} />
        {runner && (
          <div className="Event">
            <h3>{runner.fullname}</h3>

            <p>Number of 2K runs: {runner.stats.no2k}</p>
            <p>Number of 5K runs: {runner.stats.no5k}</p>
            <p>Number of personal bests: {runner.stats.noPbs}</p>
            <p>Number of times run: {runner.stats.noTotalEvents}</p>

            <h3>Results</h3>

            <DataTable
              rows={runner.eventList}
              headers={this.columns}
              render={({ rows, headers, getHeaderProps }) => (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        {headers.map(header => (
                          <TableHeader {...getHeaderProps({ header })}>
                            {header.header}
                          </TableHeader>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map(row => (
                        <TableRow key={row.id}>
                          {row.cells.map(cell => (
                            <TableCell key={cell.id}>{cell.value}</TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            />
          </div>
        )}
      </div>
    );
  }
}
