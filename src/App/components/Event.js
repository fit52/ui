import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { DataTable, Breadcrumb, BreadcrumbItem } from 'carbon-components-react';
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
    { header: 'Name', key: 'name' },
    { header: 'Distance (K)', key: 'distance' },
    { header: 'Times run', key: 'noEvents' },
    { header: 'Time (mm:ss)', key: 'timeString' },
    { header: 'Age Grade', key: 'ageGrade' },
  ];

  componentDidMount() {
    const { match } = this.props;
    api.getEvent(match.params.eventId)
      .then((eventData) => {
        const event = {
          ...eventData,
          dateString: moment(eventData.date).format('MMMM Do YYYY'),
          results: eventData.results.map(result => ({
            ...result,
            timeString: moment.duration(result.time).format('m:s'),
            id: result.uuid,
          })),
        };
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
            <Breadcrumb noTrailingSlash>
              <BreadcrumbItem href="/events">Events</BreadcrumbItem>
              <BreadcrumbItem href={`/events/${event.number}`}>{event.dateString}</BreadcrumbItem>
            </Breadcrumb>

            <h3>Stats</h3>
            <p>Number of 2K runners: {event.counts.twok}</p>
            <p>Number of 5K runners: {event.counts.fivek}</p>
            <p>Number of first time runners: {event.counts.firstTimers}</p>
            <p>Number of volunteers: {event.counts.volunteers}</p>

            <h3>Results</h3>
            <DataTable
              rows={event.results}
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
