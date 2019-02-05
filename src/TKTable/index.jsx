import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import _ from 'lodash';

import TKDataCell from './dataCell';
import TKHeadCell from './headCell';

function dataField(h) {
  if (typeof (h) === 'string') {
    return h;
  }
  if (typeof (h) === 'object') {
    return h.dataField;
  }
  return h;
}

function createRenderDataCell(header) {
  if ((typeof header) === 'object' && header.renderDataCell) {
    return props => header.renderDataCell(props);
  }
  return props => <TKDataCell {...props} />;
}

const TKTable = (props) => {
  const {
    headers,
    data,
    rowsPerPage,
    count,
    rowsPerPageOptions,
    page,
    onChangePage,
    onChangeRowsPerPage,
    onSort,
    onCellDataChange,
  } = props;
  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            { headers
              ? headers.map((h, index) => (
                <TKHeadCell
                  key={`header-${index.toString()}`}
                  value={h}
                  onSort={onSort}
                  {...props}
                />
              ))
              : (<span>TKTable: &quot;headers&quot; must be provided</span>)
            }
          </TableRow>
        </TableHead>
        <TableBody>
          { data
            ? data.map((item, row) => (
              <TableRow key={row.toString()}>
                {
                  headers.map((header, column) => {
                    const value = _.get(item, dataField(header));
                    const key = `tktc-${column}-${row}`;
                    const cellProps = onCellDataChange
                      ? {
                        page,
                        key,
                        value,
                        change: ((newValue, field) => onCellDataChange(page,
                          row,
                          field || dataField(header),
                          newValue)),
                      }
                      : {
                        page,
                        key,
                        value,
                      };
                    return createRenderDataCell(header)(cellProps);
                  })
                }
              </TableRow>
            ))
            : (<span>TKTable &quot;data&quot; must be provided</span>)
          }
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'Previous Page',
        }}
        nextIconButtonProps={{
          'aria-label': 'Next Page',
        }}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
      />
    </div>
  );
};

TKTable.defaultProps = {
  rowsPerPageOptions: [5, 10, 25],
  onCellDataChange: null,
};

TKTable.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      dataField: PropTypes.string.isRequired,
      renderDataCell: PropTypes.func,
    })])).isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
  count: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  onCellDataChange: PropTypes.func,
  onChangePage: PropTypes.func.isRequired,
  onChangeRowsPerPage: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
};

export default TKTable;
