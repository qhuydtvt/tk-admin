import React from 'react';
import { Button } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import PropTypes from 'prop-types';
import SearchBar from './searchBar';

const Actions = (props) => {
  const style = {
    display: 'flex',
    flexFlow: 'row wrap',
  };
  const {
    onFilterChange,
    onDelete,
    filters,
    filterConfigs,
    onSearch,
    searchEnabled,
    deleteEnabled,
    deletable,
    ...restProps
  } = props;
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
        ...style,
      }}
    >
      <div>
        {
          searchEnabled
          && <SearchBar onSearch={onSearch} {...restProps} />
        }
        {
          onFilterChange === null && filterConfigs !== null && filterConfigs.length > 0
          && <span>&quot;onFilterChange&quot; must be provided</span>
        }
        { onFilterChange
          && filterConfigs.map(config => (config.render({
            name: config.filterField,
            value: filters[config.filterField],
            provide: config.provide,
            onChange: event => onFilterChange(event.target.name, event.target.value),
            key: `tk-filter-${config.filterField}`,
            ...restProps,
          })))
        }
      </div>
      <div>
        {
          deleteEnabled
          && (
          <Button
            onClick={onDelete}
            disabled={!deletable}
            color="secondary"
          >
            <Delete color={deletable ? 'secondary' : 'disabled'} />
            Delete
          </Button>
          )
        }
      </div>
    </div>
  );
};

Actions.defaultProps = {
  onFilterChange: null,
  onSearch: null,
  onDelete: null,
  filters: {},
  filterConfigs: [],
  searchEnabled: true,
  deleteEnabled: true,
  createEnabled: true,
  deletable: false,
};

Actions.propTypes = {
  onFilterChange: PropTypes.func,
  onSearch: PropTypes.func,
  filters: PropTypes.shape({}),
  filterConfigs: PropTypes.shape([{
    filterField: PropTypes.string.isRequired,
    provide: PropTypes.func,
    render: PropTypes.func.isRequired,
  }]),
  searchEnabled: PropTypes.bool,
  deleteEnabled: PropTypes.bool,
  createEnabled: PropTypes.bool,
  onDelete: PropTypes.func,
  deletable: PropTypes.bool,
};

export default Actions;
