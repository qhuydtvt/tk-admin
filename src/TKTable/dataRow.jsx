import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { TableRow } from '@material-ui/core';

const styles = {
  dataRow: {
    '&:hover': {
      boxShadow: 'rgba(0, 0, 0, 0.2) 0px 1px 8px 0px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 3px 3px -2px',
    },
  },
};

const TKDataRow = (props) => {
  const {
    children,
    onClick,
    classes,
  } = props;

  return (
    <TableRow
      onClick={onClick}
      className={classes.dataRow}
    >
      {children}
    </TableRow>
  );
};

TKDataRow.defaultProps = {
  onClick: null,
};

TKDataRow.propTypes = {
  children: PropTypes.element.isRequired,
  onClick: PropTypes.func,
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(TKDataRow);
