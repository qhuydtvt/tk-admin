import React from 'react';
import {
  TableCell,
  TableSortLabel,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';

const SimpleHeadCell = (props) => {
  const { value } = props;
  return (
    <TableCell>
      {value}
    </TableCell>
  );
};

SimpleHeadCell.propTypes = {
  value: PropTypes.oneOfType(PropTypes.string, PropTypes.number).isRequired,
};

const ObjectHeadCell = (props) => {
  const { value: { title, sortable } } = props;
  if (!sortable) {
    return (
      <TableCell>
        { title }
      </TableCell>
    );
  }
  return (
    <TableCell>
      <SortableHeadCellContent {...props} />
    </TableCell>
  );
};

ObjectHeadCell.propTypes = {
  value: PropTypes.shape({
    title: PropTypes.string.isRequired,
    sortable: PropTypes.bool.isRequired,
  }).isRequired,
};

const SortableHeadCellContent = (props) => {
  const {
    value: { title, dataField },
    sortField,
    sortOrder,
    onSort,
  } = props;
  const reverseOrder = order => (order === 'asc' ? 'desc' : 'asc');
  const active = dataField === sortField;
  return (
    <TableSortLabel
      active={active}
      hideSortIcon
      onClick={() => onSort(dataField, !active ? 'desc' : reverseOrder(sortOrder))}
      direction={sortOrder}
    >
      {title}
    </TableSortLabel>
  );
};

SortableHeadCellContent.defaultProps = {
  sortField: '',
  sortOrder: 'desc',
  onSort: null,
};

SortableHeadCellContent.propTypes = {
  value: PropTypes.shape({
    title: PropTypes.string.isRequired,
    dataField: PropTypes.string.isRequired,
  }).isRequired,
  sortField: PropTypes.string,
  sortOrder: PropTypes.oneOf(['desc', 'asc']),
  onSort: PropTypes.func,
};

const HeadCell = (props) => {
  const { value } = props;
  if (typeof (value) === 'string') {
    return <SimpleHeadCell {...props} />;
  }

  if ((typeof value) === 'object') {
    return <ObjectHeadCell {...props} />;
  }

  return (
    <Typography color="secondary">
      &quot;header&quot; type:
      {typeof value}
      is not supported
    </Typography>
  );
};

HeadCell.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      sortable: PropTypes.bool.isRequired,
    }),
  ]).isRequired,
  sortField: PropTypes.string.isRequired,
  sortOrder: PropTypes.string.isRequired,
  onSort: PropTypes.func.isRequired,
};

export default HeadCell;
