import React from 'react';
import PropTypes from 'prop-types';
import {
  Toolbar as MuiToolbar,
  Typography,
  CircularProgress,
} from '@material-ui/core';

const TitleAndActions = (props) => {
  const { title } = props;
  return (
    <div>
      <Typography variant="h6">
        {title}
      </Typography>
    </div>
  );
};

TitleAndActions.propTypes = {
  title: PropTypes.string.isRequired,
};

const Progress = (props) => {
  const { isLoading } = props;
  const style = {
    visibility: isLoading ? 'visible' : 'hidden',
  };
  return (
    <div style={style}>
      <CircularProgress
        size={30}
      />
    </div>
  );
};

Progress.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

const toolBarStyle = {
  display: 'flex',
  flexFlow: 'row',
  justifyContent: 'space-between',
  width: '100%',
};

const Toolbar = props => (
  <MuiToolbar>
    <div style={toolBarStyle}>
      <TitleAndActions {...props} />
      <Progress {...props} />
    </div>
  </MuiToolbar>
);

export default Toolbar;
