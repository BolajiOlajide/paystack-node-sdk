import axios, { AxiosRequestConfig } from 'axios';

export function createHTTPClient(baseURL: string, secretKey: string, config?: AxiosRequestConfig) {
  return axios.create({
    // We don't want the baseURL and authorization config to be overwritten
    baseURL,
    // We don't want to reject requests with a status code greater than 400.
    // This is so that we can properly return the error message received from
    // Paystack.
    validateStatus: (status: number): boolean => status < 500, // Resolve only if the status code is less than 500

    // The configuration above shouldn't be overwritten as they're required for the SDK
    // to work properly.
    ...config,
    headers: {
      ...config?.headers,
      'Content-Type': 'application/json',
      Authorization: `Bearer ${secretKey}`,
    },
  });
}
