import axios, { type AxiosRequestConfig } from 'axios';

/**
 * Creates an Axios HTTP client instance configured for use with the Paystack API.
 *
 * @param {string} baseURL - The base URL for the Paystack API.
 * @param {string} secretKey - The secret key to authorise requests.
 * @param {AxiosRequestConfig} [config] - Additional Axios configuration.
 * @returns {AxiosInstance} The configured Axios HTTP client instance.
 */
export function createHTTPClient(baseURL: string, secretKey: string, config?: AxiosRequestConfig) {
  const client = axios.create({
    // We don't want the baseURL and authorisation config to be overwritten
    baseURL,

    // The configuration above shouldn't be overwritten as they're required for the SDK
    // to work properly.
    ...config,
    headers: {
      ...config?.headers,
      'Content-Type': 'application/json',
      Authorization: `Bearer ${secretKey}`,
    },
  });

  return client;
}
