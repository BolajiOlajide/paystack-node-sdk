import axios, { AxiosRequestConfig } from 'axios';

export function createHTTPClient(baseURL: string, config?: AxiosRequestConfig) {
  const defaultConfig: AxiosRequestConfig = {
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return axios.create({
    ...defaultConfig,
    ...config,
  });
}

// Example usage:

// Default config
const clientDefault = createHTTPClient('https://api.example.com/');
clientDefault
  .get('/data')
  .then((response) => console.log(response.data))
  .catch(console.error);

// Custom config
const clientCustom = createHTTPClient('https://api.example.com/', {
  timeout: 1000,
});
clientCustom
  .get('/data')
  .then((response) => console.log(response.data))
  .catch(console.error);
