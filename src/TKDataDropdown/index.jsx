import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { LinearProgress } from '@material-ui/core';

import TKDropdown from '../TKDropdown';

class TKDataDropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: null,
      isLoading: true,
    };
  }

  async componentDidMount() {
    const { provide } = this.props;
    try {
      const data = await provide();
      this.setState({ items: data, isLoading: false });
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const {
      renderDropdown,
      provide,
      value,
      ...restProps
    } = this.props;
    const { items, isLoading } = this.state;
    if (isLoading) {
      const { style } = restProps;
      const containerStyle = {
        minHeight: '1.1875em',
        display: 'flex',
        flexFlow: 'column',
        justifyContent: 'center',
      };
      return (
        <div style={containerStyle}>
          <LinearProgress style={style} color="primary" />
        </div>
      );
    }
    return (
      renderDropdown({
        menuItems: items.map(choice => ({
          title: _.get(choice, 'title'),
          value: _.get(choice, 'value'),
        })),
        value,
        ...restProps,
      })
    );
  }
}

TKDataDropDown.defaultProps = {
  style: { width: '120px' },
  renderDropdown: props => <TKDropdown {...props} />,
  provide: () => [],
  value: '',
};

TKDataDropDown.propTypes = {
  style: PropTypes.shape({}),
  renderDropdown: PropTypes.func,
  provide: PropTypes.func,
  value: PropTypes.oneOf([
    PropTypes.string,
    PropTypes.number,
    PropTypes.shape({}),
  ]),
};

export default TKDataDropDown;
