import React from 'react';
import {
  TableCell,
  TableSortLabel,
  Tooltip,
} from '@material-ui/core';
import PropTypes from 'prop-types';

const HeadCell = (props) => {
  const { value } = props;
  if (typeof (value) === 'string') {
    return (
      <TableCell {...props}>
        {value}
      </TableCell>
    );
  }

  if (typeof (value) === 'object' && !value.sortable) {
    return (
      <TableCell {...props}>
        {value.name}
      </TableCell>
    );
  }

  if (typeof (value) === 'object' && value.sortable) {
    return (
      <TableCell>
        <TableSortLabel active={true} hideSortIcon={false}>
          {value.name}
        </TableSortLabel>
      </TableCell>
    );
  }
};

HeadCell.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      sortable: PropTypes.bool,
    })
  ]).isRequired,
};

export default HeadCell;