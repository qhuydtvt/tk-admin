import React from 'react';
import PropTypes from 'prop-types';

const TKDev = (props) => {
  const {
    type,
    children,
  } = props;
  const style = {
    color: type === 'warning' ? 'orange' : 'red',
    fontSize: '0.8em',
  };
  return (
    <div style={style}>
      { children }
    </div>
  );
};

TKDev.defaultProps = {
  type: 'error',
};

TKDev.propTypes = {
  type: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]).isRequired,
};

export default TKDev;
