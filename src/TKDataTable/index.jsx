import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TKDataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      rowsPerPage: 10,
      count: 0,
      data: [],
      rowsPerPageOptions: [5, 10, 15, 25],
    };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
  }

  async componentDidMount() {
    const { provideData } = this.props;
    const { page, rowsPerPage } = this.state;
    const dataPage = await provideData(page, rowsPerPage);
    this.setState({
      count: dataPage.count,
      data: dataPage.data,
    });
  }

  async handlePageChange(event, newPage) {
    const { provideData } = this.props;
    const { rowsPerPage } = this.state;
    const dataPage = await provideData(newPage, rowsPerPage);
    this.setState({
      count: dataPage.count,
      data: dataPage.data,
      page: newPage,
    });
  }

  async handleChangeRowsPerPage(event) {
    const { provideData } = this.props;
    const dataPage = await provideData(0, event.target.value);
    this.setState({
      count: dataPage.count,
      data: dataPage.data,
      page: 0,
      rowsPerPage: event.target.value,
    });
  }

  render() {
    const { renderTable, headers } = this.props;
    const {
      data,
      count,
      rowsPerPage,
      rowsPerPageOptions,
      page,
    } = this.state;
    return (
      <div>
        {
          renderTable({
            headers,
            data,
            count,
            rowsPerPage,
            rowsPerPageOptions,
            page,
            onChangePage: this.handlePageChange,
            onChangeRowsPerPage: this.handleChangeRowsPerPage,
          })
        }
      </div>
    );
  }
}

TKDataTable.propTypes = {
  renderTable: PropTypes.func.isRequired,
  headers: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({})])).isRequired,
};
