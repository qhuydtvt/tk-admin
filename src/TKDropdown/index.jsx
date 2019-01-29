import React from 'react';
import PropTypes from 'prop-types';
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@material-ui/core';

const TKDropdown = (props) => {
  const {
    menuItems,
    onChange,
    value,
    title,
    name,
    style,
  } = props;
  return (
    <FormControl
      style={style}
    >
      <InputLabel htmlFor={`tk-dd-${name}`}>{title}</InputLabel>
      <Select
        value={value}
        onChange={onChange}
        inputProps={{
          name,
          id: `tk-dd-${name}`,
        }}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>

        {
          menuItems.map(item => (
            <MenuItem value={item.value} key={item.value}>
              {item.title}
            </MenuItem>
          ))
        }
      </Select>
    </FormControl>
  );
};

TKDropdown.defaultProps = {
  menuItems: [],
  onChange: null,
  value: '',
  style: {},
};

TKDropdown.propTypes = {
  menuItems: PropTypes.shape([
    PropTypes.shape({
      value: PropTypes.oneOf([
        PropTypes.string,
        PropTypes.number,
        PropTypes.shape({}),
      ]),
      title: PropTypes.string.isRequired,
    }),
  ]),
  onChange: PropTypes.func,
  value: PropTypes.oneOf([
    PropTypes.string,
    PropTypes.number,
    PropTypes.shape({}),
  ]),
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  style: PropTypes.shape({}),
};

export default TKDropdown;
