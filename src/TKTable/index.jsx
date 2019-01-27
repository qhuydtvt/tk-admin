import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import _ from 'lodash';

function headerName(h) {
  if (typeof (h) === 'string') {
    return h;
  }
  if (typeof (h) === 'object') {
    return h.name;
  }
  return h;
}

function headerField(h) {
  if (typeof (h) === 'string') {
    return h;
  }
  if (typeof (h) === 'object') {
    return h.field;
  }
  return h;
}

const TKTable = (props) => {
  const {
    headers, data,
    rowsPerPage,
    count,
    rowsPerPageOptions,
    page,
    onChangePage,
    onChangeRowsPerPage,
  } = props;
  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            {
              headers.map((h, index) => (
                <TableCell key={`header-${index.toString()}`}>
                  {headerName(h)}
                </TableCell>
              ))
            }
          </TableRow>
        </TableHead>

        <TableBody>
          {
            data.map((item, index) => (
              <TableRow key={index.toString()}>
                {
                  headers.map((h, i) => (
                    <TableCell key={`item-${i.toString()}`}>
                      {_.get(item, headerField(h))}
                    </TableCell>
                  ))
                }
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'Previous Page',
        }}
        nextIconButtonProps={{
          'aria-label': 'Next Page',
        }}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
      />
    </Paper>);
};

TKTable.defaultProps = {
  rowsPerPageOptions: [5, 10, 25],
};

TKTable.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({})])).isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
  count: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  onChangeRowsPerPage: PropTypes.func.isRequired,
};

export default TKTable;