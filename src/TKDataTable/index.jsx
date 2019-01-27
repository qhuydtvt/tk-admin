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
      isLoading: false,
      sortField: '',
      sortOrder: '',
    };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }

  async componentDidMount() {
    const { provideData } = this.props;
    const { page, rowsPerPage } = this.state;
    this.setState({ isLoading: true });
    const dataPage = await provideData(page, rowsPerPage);
    this.setState({
      count: dataPage.count,
      data: dataPage.data,
      isLoading: false,
    });
  }

  async handlePageChange(event, newPage) {
    const { provideData } = this.props;
    const { rowsPerPage, sortField, sortOrder } = this.state;
    this.setState({ isLoading: true });
    const dataPage = await provideData(newPage, rowsPerPage, sortField, sortOrder);
    this.setState({
      count: dataPage.count,
      data: dataPage.data,
      page: newPage,
      isLoading: false,
    });
  }

  async handleSort(field, order) {
    const { provideData } = this.props;
    const { page, rowsPerPage } = this.state;
    this.setState({
      sortField: field,
      sortOrder: order,
      isLoading: true,
    });
    const dataPage = await provideData(page, rowsPerPage, field, order);
    this.setState({
      data: dataPage.data,
      isLoading: false,
    });
  }

  async handleChangeRowsPerPage(event) {
    const { provideData } = this.props;
    const { sortField, sortOrder } = this.state;
    this.setState({ isLoading: true });
    const dataPage = await provideData(0, event.target.value, sortField, sortOrder);
    this.setState({
      count: dataPage.count,
      data: dataPage.data,
      page: 0,
      rowsPerPage: event.target.value,
      isLoading: false,
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
      isLoading,
      sortField,
      sortOrder,
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
            isLoading,
            sortField,
            sortOrder,
            sort: this.handleSort,
            ...this.props,
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
  provideData: PropTypes.func.isRequired,
};
