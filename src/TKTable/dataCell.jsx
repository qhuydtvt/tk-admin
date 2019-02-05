import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';

const TKDataCell = (props) => {
  const {
    value,
    style,
  } = props;
  return (
    <TableCell
      style={style}
    >
      { value }
    </TableCell>
  );
};

TKDataCell.defaultProps = {
  style: {},
};

TKDataCell.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element,
  ]).isRequired,
  style: PropTypes.shape({}),
};

export default TKDataCell;
