import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TKTable from '../TKTable';

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
      filters: {},
    };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleCellDataChange = this.handleCellDataChange.bind(this);
    this.fetch = this.fetch.bind(this);
  }

  componentDidMount() {
    const { headers } = this.props;
    if (headers) {
      this.fetch();
    }
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

  handleFilterChange(name, value) {
    this.setState({ filters: { [name]: value } }, this.fetch);
  }

  handleCellDataChange(pageToChange, row, field, newValue) {
    const { page, data } = this.state;
    if (page === pageToChange) {
      const dataRow = data[row];
      const newDataRow = { ...dataRow, [field]: newValue };
      const newData = data.map((item, i) => (i === row ? newDataRow : item));
      this.setState({
        data: newData,
      });
    }
  }

  async fetch() {
    const {
      page,
      rowsPerPage,
      sortField,
      sortOrder,
      search,
      filters,
    } = this.state;
    const { provide } = this.props;
    this.setState({ isLoading: true });
    try {
      const dataPage = await provide(page, rowsPerPage, sortField, sortOrder, search, filters);
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
    const { renderTable, renderToolbar, ...restProps } = this.props;
    const {
      data,
      count,
      rowsPerPage,
      rowsPerPageOptions,
      page,
      isLoading,
      sortField,
      sortOrder,
      filters,
    } = this.state;
    return (
      <div>
        { renderToolbar
          && renderToolbar({
            filters,
            onFilterChange: this.handleFilterChange,
            isLoading,
            onSearch: this.handleSearch,
          })
        }
        { renderTable
          ? renderTable({
            data,
            count,
            rowsPerPage,
            rowsPerPageOptions,
            page,
            onChangePage: this.handlePageChange,
            onChangeRowsPerPage: this.handleChangeRowsPerPage,
            onCellDataChange: this.handleCellDataChange,
            sortField,
            sortOrder,
            onSort: this.handleSort,
            ...restProps,
          })
          : <span>&quot;renderTable&quot; must be provided</span>
        }
      </div>
    );
  }
}

TKDataTable.defaultProps = {
  renderToolbar: null,
  renderTable: props => <TKTable {...props} />,
};

TKDataTable.propTypes = {
  renderTable: PropTypes.func,
  renderToolbar: PropTypes.func,
  headers: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({})])).isRequired,
  provide: PropTypes.func.isRequired,
};
