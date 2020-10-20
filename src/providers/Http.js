const axios = require('axios').default;

axios.defaults.baseURL = 'https://www.themealdb.com/api/json/v1/1';
axios.defaults.headers.common['Content-Type'] = 'application/json';

export default axios;