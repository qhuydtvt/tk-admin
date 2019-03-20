import axios from 'axios';
import _ from 'lodash';

axios.defaults.withCredentials = true;

const createHeaders = (token, tokenField='x-auth-token') => {
  let headers = {};
  if (!!token) {
    headers[tokenField] = token;
  }
  return headers;
}

const createProvidePage = (resourceUrl, dataField='', token='') => (async (
  page,
  rowPerPage,
  sort,
  order,
  search,
  filters = {}) => {
  const start = page * rowPerPage;
  const end = start + rowPerPage - 1;
  const headers = createHeaders(token);
  const response = await axios.get(resourceUrl, {
    params: {
      _start: start,
      _end: end,
      _sort: sort,
      _order: order,
      q: search,
      ...filters,
    },
    headers,
  });
  return {
    data: !!dataField ? _.get(response.data, dataField) : response.data,
    count: parseInt(response.headers['x-total-count'], 10),
  };
});

export const createDeleteOne = (resourceUrl, idField = '_id', token='') => async (item) => {
  const _id = _.get(item, idField);
  const headers = createHeaders(token);
  const response = await axios.delete(`${resourceUrl}/${_id}`, { headers });
  return !!response.data;
};

export const createProvideInputOptions = (resourceUrl, titleField, valueField, dataField = '', token='') => (
  async () => {
    const headers = createHeaders(token);
    const response = await axios.get(resourceUrl, { headers });
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
