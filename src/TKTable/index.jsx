import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
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
    return header.renderDataCell;
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
            ? data.map((item, index) => (
              <TableRow key={index.toString()}>
                {
                  headers.map((h, i) => (
                    createRenderDataCell(h)({
                      key: `item-${i.toString()}`,
                      value: _.get(item, dataField(h)),
                    })
                  ))
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
  onChangePage: PropTypes.func.isRequired,
  onChangeRowsPerPage: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
};

export default TKTable;
