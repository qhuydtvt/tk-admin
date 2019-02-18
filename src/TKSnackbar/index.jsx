import React from 'react';
import PropTypes from 'prop-types';

import { Snackbar, Button } from '@material-ui/core';

const TKSnackbar = (props) => {
  const {
    message,
    open,
    onClose,
    onUndo,
  } = props;
  const anchorOrigin = {
    vertical: 'bottom',
    horizontal: 'center',
  };
  return (
    <Snackbar
      anchorOrigin={anchorOrigin}
      open={open}
      onClose={onClose}
      ContentProps={{
        'aria-describedby': 'message-id',
      }}
      message={<span id="message-id">{message}</span>}
      action={[
        <Button key="undo" color="primary" size="small" onClick={onUndo}>
          UNDO
        </Button>,
      ]}
    />
  );
};

TKSnackbar.propTypes = {
  message: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onUndo: PropTypes.func.isRequired,
};

export default TKSnackbar;
