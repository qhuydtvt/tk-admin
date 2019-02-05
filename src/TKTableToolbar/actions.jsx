import React from 'react';
import PropTypes from 'prop-types';
import SearchBar from './searchBar';

const Actions = (props) => {
  const style = {
    display: 'flex',
    flexFlow: 'row wrap',
  };
  const {
    onFilterChange,
    filters,
    filterConfigs,
    onSearch,
    searchEnabled,
    ...restProps
  } = props;
  return (
    <div style={style}>
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
  );
};

Actions.defaultProps = {
  onFilterChange: null,
  onSearch: null,
  filters: {},
  filterConfigs: [],
  searchEnabled: true,
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
};

export default Actions;
