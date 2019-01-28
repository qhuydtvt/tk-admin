import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Typography } from '@material-ui/core';
import _ from 'lodash';

const SearchBar = (props) => {
  const { search } = props;
  if (!search) {
    return (
      <Typography color="secondary">
        Search bar must be provided a function named &quot;search&quot;
      </Typography>
    );
  }
  const searchWithDebounce = _.debounce(search, 300);
  return (
    <TextField
      label="Search"
      type="search"
      margin="normal"
      onChange={e => searchWithDebounce(e.target.value)}
    />
  );
};

SearchBar.propTypes = {
  search: PropTypes.func.isRequired,
};

export default SearchBar;
