import React from 'react';
import PropTypes from 'prop-types';
import TablePagination from '@material-ui/core/TablePagination';

const TKTablePagination = (props) => {
  const {
    rowsPerPageOptions,
    count,
    rowsPerPage,
    page,
    onChangePage,
    onChangeRowsPerPage,
  } = props;
  return (
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
  );
};

TKTablePagination.defaultProps = {
  rowsPerPageOptions: [5, 10, 15, 20],
  count: 0,
  rowsPerPage: 10,
  page: 0,
  onChangePage: null,
  onChangeRowsPerPage: null,
};

TKTablePagination.propTypes = {
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
  count: PropTypes.number,
  rowsPerPage: PropTypes.number,
  page: PropTypes.number,
  onChangePage: PropTypes.func,
  onChangeRowsPerPage: PropTypes.func,
};

export default TKTablePagination;
