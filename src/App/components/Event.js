import './Event.scss';

import React from 'react';
import PropTypes from 'prop-types';
import { DataTable, Breadcrumb, BreadcrumbItem } from 'carbon-components-react';
import 'react-table/react-table.css';

import { sortCellValues, formatTableCell } from '../services/format';
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

export default class Events extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
  }

  state = {
    event: null,
    loading: true,
  };

  columns = [
    { header: 'Position', key: 'pos' },
    { header: 'Name', key: 'runner' },
    { header: 'Distance (K)', key: 'distance' },
    { header: 'Times run', key: 'noEvents' },
    { header: 'Time (mm:ss)', key: 'timeString' },
    { header: 'Age Grade', key: 'ageGrade' },
  ];

  componentDidMount() {
    const { match } = this.props;
    api.getEvent(match.params.eventId)
      .then((event) => {
        this.setState({ event, loading: false });
      });
  }

  render() {
    const { event, loading } = this.state;

    return (
      <div>
        <Spinner loading={loading} />
        {event && (
          <div className="Event">
            <Breadcrumb noTrailingSlash className="Event-breadcrumb">
              <BreadcrumbItem href="/events">Events</BreadcrumbItem>
              <BreadcrumbItem href={`/events/${event.number}`}>{event.dateString}</BreadcrumbItem>
            </Breadcrumb>

            <section className="Event-stats">
              <h2>Stats</h2>
              <p>Number of 2K runners: {event.counts.twok}</p>
              <p>Number of 5K runners: {event.counts.fivek}</p>
              <p>Number of first time runners: {
                event.counts.firstTimers || event.counts.firstTimes }
              </p>
              <p>Number of volunteers: {event.counts.volunteers}</p>
            </section>

            <h2>Results</h2>
            <DataTable
              rows={event.results}
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
