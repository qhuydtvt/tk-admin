import axios from 'axios';
import _ from 'lodash';

axios.defaults.withCredentials = true;

const createProvidePage = resourceUrl => (async (
  page,
  rowPerPage,
  sort,
  order,
  search,
  filters = {}) => {
  const start = page * rowPerPage;
  const end = start + rowPerPage - 1;
  const response = await axios.get(resourceUrl, {
    params: {
      _start: start,
      _end: end,
      _sort: sort,
      _order: order,
      q: search,
      ...filters,
    },
  });
  return {
    data: response.data,
    count: parseInt(response.headers['x-total-count'], 10),
  };
});

export const createDeleteOne = resourceUrl => async (_id) => {
  const response = await axios.delete(`${resourceUrl}/${_id}`);
  return response.data && response.data.success;
};

export const createProvideInputOptions = (resourceUrl, titleField, valueField, dataField = '') => (
  async () => {
    const response = await axios.get(resourceUrl);
    let items = null;
    if (dataField) {
      items = _.get(response.data, dataField);
    } else {
      items = response.data;
    }
    return items.map(item => ({
      title: _.get(item, titleField),
      value: _.get(item, valueField),
    }));
  }
);

export default createProvidePage;
