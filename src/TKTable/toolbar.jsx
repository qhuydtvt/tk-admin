import React from 'react';
import PropTypes from 'prop-types';
import {
  Toolbar as MuiToolbar,
  CircularProgress,
} from '@material-ui/core';

import SearchBar from './searchBar';

const TitleAndActions = (props) => {
  const style = {
    display: 'flex',
    flexFlow: 'column',
  };
  return (
    <div style={style}>
      <SearchBar {...props} />
    </div>
  );
};

const Progress = (props) => {
  const { isLoading } = props;
  const style = {
    visibility: isLoading ? 'visible' : 'hidden',
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
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
