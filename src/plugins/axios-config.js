import axios from 'axios';

window.axios = axios;

//axios.defaults.baseURL = 'https://api.open-meteo.com/v1/forecast';
axios.defaults.baseURL = 'https://api.openweathermap.org/data/3.0/';

axios.interceptors.request.use(
  (config) => {
    config.metadata = { startTime: new Date() };

    config.headers = {
      ...config.headers,
      Accept: 'application/json'
      //'Content-Type': 'application/json',
      //'Access-Control-Allow-Origin': '*'
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
