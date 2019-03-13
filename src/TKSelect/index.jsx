/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import _ from 'lodash';
import classNames from 'classnames';

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 250,
  },
  input: {
    display: 'flex',
    padding: 0,
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
      0.08,
    ),
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    fontSize: 16,
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
});

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps,
        },
      }}
      {...props.selectProps.textFieldProps}
    />
  );
}

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function SingleValue(props) {
  return (
    <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
      {props.children}
    </Typography>
  );
}

function ValueContainer(props) {
  return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function MultiValue(props) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={classNames(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused,
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  );
}

function Menu(props) {
  return (
    <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  );
}

const components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
};

const checkFunctionOrString = (el, input) => {
  if (typeof (input) === 'function') {
    return input(el);
  }
  return _.get(el, input);
};

const TKSelect = (props) => {
  const {
    classes,
    options,
    onChange,
    value,
    placeholder,
    label,
    displayText,
    displayValue,
  } = props;

  const convertOptions = options.map(item => (
    {
      label: displayText ? checkFunctionOrString(item, displayText) : item.title,
      value: displayValue ? checkFunctionOrString(item, displayValue) : item.value,
    }
  ));
  return (
    <Select
      classes={classes}
      options={convertOptions}
      components={components}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      textFieldProps={{
        label,
        InputLabelProps: {
          shrink: true,
        },
      }}
      isClearable
    />
  );
};

TKSelect.defaultProps = {
  onChange: null,
  options: [],
  placeholder: '',
  label: '',
  value: {},
  displayText: '',
  displayValue: '',
  classes: {},
};

TKSelect.propTypes = {
  classes: PropTypes.shape({}),
  onChange: PropTypes.func,
  displayText: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  displayValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  options: PropTypes.arrayOf(PropTypes.shape({})),
  value: PropTypes.oneOfType([
    PropTypes.shape({}),
    PropTypes.string,
  ]),
  label: PropTypes.string,
  placeholder: PropTypes.string,
};

export default withStyles(styles)(TKSelect);
