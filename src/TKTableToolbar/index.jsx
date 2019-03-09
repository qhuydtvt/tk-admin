import React from 'react';
import PropTypes from 'prop-types';
import {
  Toolbar as MuiToolbar,
  CircularProgress,
} from '@material-ui/core';

import Actions from './actions';

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

const Toolbar = (props) => {
  const {
    isLoading,
    onSearch,
    onFilterChange,
    filters,
    filterConfigs,
    searchEnabled,
    createEnabled,
    loadingEnabled,
    onCreate,
    ...restProps
  } = props;
  return (
    <MuiToolbar>
      <div style={toolBarStyle}>
        <Actions
          searchEnabled={searchEnabled}
          onSearch={onSearch}
          onFilterChange={onFilterChange}
          filters={filters}
          filterConfigs={filterConfigs}
          createEnabled={createEnabled}
          onCreate={onCreate}
          {...restProps}
        />
        {
          loadingEnabled
          && (
          <Progress
            isLoading={isLoading}
            style={{
              marginLeft: '16px',
            }}
            {...restProps}
          />
          )
        }
      </div>
    </MuiToolbar>
  );
};

Toolbar.defaultProps = {
  loadingEnabled: true,
  onSearch: null,
  onCreate: null,
  onFilterChange: null,
  filters: {},
  filterConfigs: [],
  searchEnabled: true,
  createEnabled: true,
};

Toolbar.propTypes = {
  loadingEnabled: PropTypes.bool,
  isLoading: PropTypes.bool.isRequired,
  searchEnabled: PropTypes.bool,
  createEnabled: PropTypes.bool,
  onSearch: PropTypes.func,
  onFilterChange: PropTypes.func,
  filters: PropTypes.shape({}),
  onCreate: PropTypes.func,
  filterConfigs: PropTypes.shape([{
    filterField: PropTypes.string.isRequired,
    title: PropTypes.string,
    provide: PropTypes.func,
    render: PropTypes.func.isRequired,
  }]),
};

export default Toolbar;
