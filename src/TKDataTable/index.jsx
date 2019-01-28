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
      search: '',
    };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.fetch = this.fetch.bind(this);
  }

  componentDidMount() {
    this.fetch();
  }

  handlePageChange(event, page) {
    this.setState({ page }, this.fetch);
  }

  handleSort(sortField, sortOrder) {
    this.setState({ sortField, sortOrder }, this.fetch);
  }

  handleChangeRowsPerPage(event) {
    this.setState({ rowsPerPage: event.target.value, page: 0 }, this.fetch);
  }

  handleSearch(search) {
    this.setState({ search }, this.fetch);
  }

  async fetch() {
    const {
      page,
      rowsPerPage,
      sortField,
      sortOrder,
      search,
    } = this.state;
    const { provideData } = this.props;
    this.setState({ isLoading: true });
    try {
      const dataPage = await provideData(page, rowsPerPage, sortField, sortOrder, search);
      this.setState({
        isLoading: false,
        data: dataPage.data,
        count: dataPage.count,
      });
    } catch (err) {
      console.log(err);
    }
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
            search: this.handleSearch,
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
