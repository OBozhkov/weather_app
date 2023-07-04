import axios from 'axios';

window.axios = axios;

axios.defaults.baseURL = 'https://api.openweathermap.org/data/3.0/';

axios.interceptors.request.use(
  (config) => {
    config.metadata = { startTime: new Date() };

    config.headers = {
      ...config.headers,
      Accept: 'application/json'
    };

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(function (response) {
  response.config.metadata.endTime = new Date();
  response.duration =
    response.config.metadata.endTime - response.config.metadata.startTime;

  return response;
});
