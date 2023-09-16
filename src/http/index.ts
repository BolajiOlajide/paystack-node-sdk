import axios, { AxiosRequestConfig } from 'axios';

export function createHTTPClient(baseURL: string, secretKey: string, config?: AxiosRequestConfig) {
  const defaultConfig: AxiosRequestConfig = {
    ...config,
    // We don't want the baseURL and authorization config to be overwritten
    baseURL,
    headers: {
      ...config?.headers,
      'Content-Type': 'application/json',
      Authorization: `Bearer ${secretKey}`,
    },
  };

  return axios.create({
    ...defaultConfig,
    ...config,
  });
}
