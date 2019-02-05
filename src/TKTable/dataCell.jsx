import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';

const TKDataCell = (props) => {
  const { value, ...restProps } = props;
  return (
    <TableCell
      {...restProps}
    >
      { value }
    </TableCell>
  );
};

TKDataCell.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element,
  ]).isRequired,
};

export default TKDataCell;
