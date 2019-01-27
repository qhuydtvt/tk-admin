import axios from 'axios';

axios.defaults.withCredentials = true;

export default resourceUrl => (async (page, rowPerPage) => {
  const start = page * rowPerPage;
  const end = start + rowPerPage - 1;
  const response = await axios.get(resourceUrl, {
    params: {
      _start: start,
      _end: end,
    },
  });
  return {
    data: response.data,
    count: parseInt(response.headers['x-total-count'], 10),
  };
});
