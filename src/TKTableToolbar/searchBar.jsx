import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Typography } from '@material-ui/core';
import _ from 'lodash';

const SearchBar = (props) => {
  const { onSearch, style } = props;
  if (!onSearch) {
    return (
      <Typography color="secondary">
        Search bar must be provided a function named &quot;onSearch&quot;
      </Typography>
    );
  }
  const onSearchWithDebounce = _.debounce(onSearch, 300);
  return (
    <TextField
      label="Search"
      type="search"
      margin="normal"
      style={style}
      onChange={e => onSearchWithDebounce(e.target.value)}
    />
  );
};

SearchBar.defaultProps = {
  style: { marginTop: '0px', marginRight: '8px' },
};

SearchBar.propTypes = {
  style: PropTypes.shape({}),
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
