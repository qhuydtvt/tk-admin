import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
  TableCell,
  TableRow,
  Table,
  TableBody,
  TableHead,
  Checkbox,
} from '@material-ui/core';
import TKDev from '../TKDev';
import TKDataCell from './dataCell';
import TKHeadCell from './headCell';
import TKDataRow from './dataRow';

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
    page,
    onSort,
    onCellDataChange,
    selectable,
    onRowSelectionChange,
    onAllRowSelectionChange,
    onRowClick,
  } = props;
  const allSelected = !data.find(item => !item.selected);
  const handleRowClick = onRowClick ? (item) => {
    if (onRowClick) {
      onRowClick(item);
    }
  } : null;
  return (
    <Table>
      <TableHead>
        <TableRow>
          {
            selectable
            && (
            <TableCell
              style={{
                padding: '0px',
              }}
            >
              {
                !!onAllRowSelectionChange
                && (
                  <Checkbox
                    color="primary"
                    checked={allSelected}
                    onChange={(event, checked) => onAllRowSelectionChange(page, checked)}
                  />
                )
              }
            </TableCell>
            )
          }
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
            <TKDataRow
              key={row.toString()}
              onClick={() => handleRowClick(item)}
            >
              {
                selectable && !onRowSelectionChange
                && (
                  <TKDev>
                    When &quot;selectable&quot; is true,
                    &quot;onRowSelectionChange&quot; must be provided
                  </TKDev>
                )
              }
              {
                selectable && onRowSelectionChange
                && (
                <TableCell
                  style={{
                    padding: '0px',
                  }}
                >
                  <Checkbox
                    color="primary"
                    checked={!!item.selected}
                    onClick={e => e.stopPropagation()}
                    onChange={(event, checked) => onRowSelectionChange(page, row, checked)}
                  />
                </TableCell>
                )
              }
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
            </TKDataRow>
          ))
          : (<span>TKTable &quot;data&quot; must be provided</span>)
        }
      </TableBody>
    </Table>
  );
};

TKTable.defaultProps = {
  onCellDataChange: null,
  page: 0,
  selectable: true,
  onRowClick: null,
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
  page: PropTypes.number,
  onCellDataChange: PropTypes.func,
  onSort: PropTypes.func.isRequired,
  selectable: PropTypes.bool,
  onRowSelectionChange: PropTypes.func.isRequired,
  onAllRowSelectionChange: PropTypes.func.isRequired,
  onRowClick: PropTypes.func,
};

export default TKTable;
