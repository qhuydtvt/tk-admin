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
}

const ObjectHeadCell = (props) => {
  const { value: { name, sortable } } = props;
  if (!sortable) {
    return (
      <TableCell>
        { name }
      </TableCell>
    )
  } else {
    return (
      <TableCell>
        <SortableHeadCellContent {...props} />
      </TableCell>
    );
  }
}

const SortableHeadCellContent = (props) => {
  const { value: { name, field }, sortField, sortOrder, sort } = props;
  const reverseOrder = (order) => (order === 'asc' ? 'desc' : 'asc');
  const active = field === sortField;
  return (
    <TableSortLabel
      active={active}
      hideSortIcon={true}
      onClick={() => sort(field, !active ? 'desc' : reverseOrder(sortOrder))}
      direction={sortOrder}
    >
      {name}
    </TableSortLabel>
  );
}

const HeadCell = (props) => {
  const { value } = props;
  if (typeof (value) === 'string') {
    return <SimpleHeadCell {...props} />
  }

  if (typeof(value) === 'object') {
    return <ObjectHeadCell {...props} />
  }

  return (
    <Typography color="secondary">
      &quot;header&quot; type:
      {typeof(value)}
      is not supported
    </Typography>
  );
};

HeadCell.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      sortable: PropTypes.bool.isRequired,
    })
  ]).isRequired,
  sortField: PropTypes.string.isRequired,
  sortOrder: PropTypes.string.isRequired,
  sort: PropTypes.func.isRequired,
};

export default HeadCell;