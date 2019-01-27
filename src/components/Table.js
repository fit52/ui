import React from 'react';
import PropTypes from 'prop-types';
import { DataTable } from 'carbon-components-react';
import { sortCellValues, formatTableCell } from '../services/format';

const {
  TableContainer,
  Table: CarbonTable,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableHeader,
} = DataTable;

const Table = ({ rows, headers }) => (
  <DataTable
    rows={rows}
    headers={headers}
    sortRow={sortCellValues}
    render={({ rows: tableRows, headers: tableHeaders, getHeaderProps }) => (
      <TableContainer>
        <CarbonTable>
          <TableHead>
            <TableRow>
              {tableHeaders.map(header => (
                <TableHeader {...getHeaderProps({ header })}>
                  {header.header}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableRows.map(row => (
              <TableRow key={row.id}>
                {row.cells.map(cell => (
                  <TableCell key={cell.id}>{formatTableCell(cell.value)}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </CarbonTable>
      </TableContainer>
    )}
  />
);

Table.propTypes = {
  rows: PropTypes.array.isRequired,
  headers: PropTypes.array.isRequired,
};

export default Table;
