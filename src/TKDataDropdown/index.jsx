import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { LinearProgress } from '@material-ui/core';

class TKDataDropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      isLoading: true,
    };
  }

  async componentDidMount() {
    const { fetch } = this.props;
    try {
      const data = await fetch();
      this.setState({ data, isLoading: true });
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const {
      renderDropdown,
      config: { titleField, valueField },
      ...restProps
    } = this.props;
    const { data, isLoading } = this.state;
    if (isLoading) {
      const { style } = restProps;
      return <LinearProgress style={style} color="primary" />;
    }
    return (
      renderDropdown({
        menuItems: data.map(choice => ({
          title: _.get(choice, titleField),
          value: _.get(choice, valueField),
        })),
        ...restProps,
      })
    );
  }
}

TKDataDropDown.defaultProps = {
  config: {
    titleField: 'title',
    valueField: 'value',
  },
};

TKDataDropDown.propTypes = {
  renderDropdown: PropTypes.func.isRequired,
  config: PropTypes.shape({
    titleField: PropTypes.string.isRequired,
    valueField: PropTypes.string.isRequired,
  }),
  fetch: PropTypes.func.isRequired,
};

export default TKDataDropDown;
