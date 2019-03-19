import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TKTableToolbar from '../TKTableToolbar';
import TKTable from '../TKTable';
import TKTablePagination from '../TKTablePagination';
import TKSnackbar from '../TKSnackbar';

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
      deleteStatus: {
        waitting: false,
        confirmed: false,
        message: 'Deleting',
        onUndo: () => {},
        onClose: () => {},
      },
    };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleCellDataChange = this.handleCellDataChange.bind(this);
    this.handleRowSelectionChange = this.handleRowSelectionChange.bind(this);
    this.handleAllRowSelectionChange = this.handleAllRowSelectionChange.bind(this);
    this.fetch = this.fetch.bind(this);
    this.delete = this.delete.bind(this);
    this.performDelete = this.performDelete.bind(this);
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
    const { filters: oldFilters } = this.state
    this.setState({ filters: { ...oldFilters, [name]: value } }, this.fetch);
  }

  handleRowSelectionChange(changingPage, itemIndex, selected) {
    const { data, page } = this.state;
    if (page === changingPage) {
      this.setState({
        data: data.map((item, i) => (i !== itemIndex ? item : { ...item, selected })),
      });
    }
  }

  handleAllRowSelectionChange(changingPage, selected) {
    const { data, page } = this.state;
    if (page === changingPage) {
      this.setState({
        data: data.map(item => ({ ...item, selected })),
      });
    }
  }

  handleCellDataChange(pageToChange, row, field, newValue) {
    const { page, data } = this.state;
    if (page === pageToChange) {
      const dataRow = data[row];
      const newDataRow = _.cloneDeep(dataRow);
      _.set(newDataRow, field, newValue);
      const newData = data.map((item, i) => (i === row ? newDataRow : item));
      this.setState({
        data: newData,
      });
    }
  }

  async dataTask(task) {
    this.setState({ isLoading: true }, async () => {
      await task();
      this.setState({ isLoading: false });
    });
  }

  performDelete() {
    const { deleteStatus } = this.state;
    const { deleteOne } = this.props;
    const { data } = this.state;
    if (deleteStatus.waitting && deleteStatus.confirmed) {
      this.dataTask(async () => {
        const selectedItems = data.filter(item => item.selected);
        await Promise.all(selectedItems.map(async (selectedItem) => {
          if (await deleteOne(selectedItem)) {
            const { data: currentData } = this.state;
            this.setState({
              data: currentData.filter(item => item !== selectedItem),
            });
          }
        }));
      });
    }
    this.setState({ deleteStatus: { waitting: false, confirmed: false } });
  }

  delete() {
    this.setState({
      deleteStatus: {
        waitting: true,
        confirmed: true,
        onUndo: () => this.setState({ deleteStatus: { confirmed: false, waitting: false } }),
        onClose: this.performDelete,
      },
    },
    () => setTimeout(this.performDelete, 5000));
  }

  fetch() {
    const {
      page,
      rowsPerPage,
      sortField,
      sortOrder,
      search,
      filters,
    } = this.state;
    const { provide } = this.props;
    this.dataTask(async () => {
      try {
        const dataPage = await provide(page, rowsPerPage, sortField, sortOrder, search, filters);
        this.setState({
          data: dataPage.data,
          count: dataPage.count,
        });
      } catch (err) {
        console.log(err);
      }
    });
  }

  render() {
    const {
      renderTable,
      renderToolbar,
      paginationEnabled,
      toolbarEnabled,
      renderPagnition,
      renderSnackbar,
      onRowClick,
      deletingMessage,
      ...restProps
    } = this.props;
    const {
      headers,
      data,
      count,
      rowsPerPage,
      rowsPerPageOptions,
      page,
      isLoading,
      sortField,
      sortOrder,
      filters,
      deleteStatus,
    } = this.state;
    const deletable = data.reduce(
      (accumulator, currentItem) => accumulator || currentItem.selected,
      false,
    );
    return (
      <div>
        { toolbarEnabled
          && renderToolbar({
            filters,
            onFilterChange: this.handleFilterChange,
            isLoading,
            onSearch: this.handleSearch,
            data,
            deletable,
            onDelete: this.delete,
          })
        }
        {
          renderTable({
            headers,
            data,
            page,
            onCellDataChange: this.handleCellDataChange,
            sortField,
            sortOrder,
            onSort: this.handleSort,
            onRowSelectionChange: this.handleRowSelectionChange,
            onAllRowSelectionChange: this.handleAllRowSelectionChange,
            onRowClick,
            ...restProps,
          })
        }
        {
          paginationEnabled
          && renderPagnition({
            count,
            rowsPerPage,
            rowsPerPageOptions,
            page,
            onChangePage: this.handlePageChange,
            onChangeRowsPerPage: this.handleChangeRowsPerPage,
          })
        }
        {
          renderSnackbar({
            open: deleteStatus.waitting,
            message: deletingMessage,
            onUndo: deleteStatus.onUndo,
            onClose: deleteStatus.onClose,
          })
        }
      </div>
    );
  }
}

TKDataTable.defaultProps = {
  paginationEnabled: true,
  toolbarEnabled: true,
  renderToolbar: props => <TKTableToolbar {...props} />,
  renderTable: props => <TKTable {...props} />,
  renderPagnition: props => <TKTablePagination {...props} />,
  renderSnackbar: props => <TKSnackbar {...props} />,
  deleteOne: null,
  onRowClick: null,
  deletingMessage: 'Deleting records',
};

TKDataTable.propTypes = {
  renderTable: PropTypes.func,
  paginationEnabled: PropTypes.bool,
  renderPagnition: PropTypes.func,
  toolbarEnabled: PropTypes.bool,
  renderToolbar: PropTypes.func,
  renderSnackbar: PropTypes.func,
  headers: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({})])).isRequired,
  provide: PropTypes.func.isRequired,
  deleteOne: PropTypes.func,
  deletingMessage: PropTypes.string,
  onRowClick: PropTypes.func,
};
