import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';

/**
 * Creates an Axios HTTP client instance configured for use with the Paystack API.
 *
 * @param {string} baseURL - The base URL for the Paystack API.
 * @param {string} secretKey - The secret key to authorize requests.
 * @param {AxiosRequestConfig} [config] - Additional Axios configuration.
 * @returns {AxiosInstance} The configured Axios HTTP client instance.
 */
export function createHTTPClient(baseURL: string, secretKey: string, config?: AxiosRequestConfig) {
  const client = axios.create({
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

  // client.interceptors.response = f

  return client;
}
