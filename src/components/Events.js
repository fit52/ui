import React from 'react';
import { DataTable } from 'carbon-components-react';
import { sortCellValues, formatTableCell } from '../services/format';
import Spinner from './Spinner';

import { getEvents } from '../services/api';

import './Events.scss';

const {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableHeader,
} = DataTable;

export default class Events extends React.Component {
  state = {
    events: [],
    loading: true,
  };

  columns = [
    { header: 'Event', key: 'name' },
    { header: '5K Runners', key: 'fivek' },
    { header: '2K Runners', key: 'twok' },
    { header: 'First Timers', key: 'firstTimes' },
  ];

  componentDidMount() {
    getEvents()
      .then(events => this.setState({ events, loading: false }));
  }

  render() {
    const { events, loading } = this.state;

    return (
      <div>
        <Spinner loading={loading} />
        {events.length > 0 && (
          <div className="Events">
            <h2>Recent events</h2>
            <DataTable
              rows={events}
              headers={this.columns}
              sortRow={sortCellValues}
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
                            <TableCell key={cell.id}>{formatTableCell(cell.value)}</TableCell>
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
