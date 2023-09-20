import { AxiosInstance, AxiosResponse } from 'axios';

import { CREATE_CUSTOMER_ENDPOINT, LIST_CUSTOMERS_ENDPOINT } from '../constants';
import { handleError } from '../error';
import {
  type CreateCustomerArgs,
  createCustomerArgsSchema,
  type CreateCustomerResponse,
  type Customer,
  listCustomerArgsSchema,
  ListCustomerArgs,
  ListCustomersResponse,
} from '../schema/customer.schema';
import { isNonErrorResponse } from '../utils/status.util';

class CustomerModule {
  private httpClient: AxiosInstance;

  constructor(httpClient: AxiosInstance) {
    this.httpClient = httpClient;
  }

  async create(args: CreateCustomerArgs): Promise<Customer> {
    try {
      createCustomerArgsSchema.parse(args);

      const { data, status } = await this.httpClient.post<
        CreateCustomerResponse,
        AxiosResponse<CreateCustomerResponse>,
        CreateCustomerArgs
      >(CREATE_CUSTOMER_ENDPOINT, args);

      if (data.status && isNonErrorResponse(status)) {
        return data.data;
      }

      return Promise.reject({ message: data.message });
    } catch (err) {
      return handleError(err);
    }
  }

  async list(args: ListCustomerArgs): Promise<Customer[]> {
    try {
      listCustomerArgsSchema.parse(args);

      const { data, status } = await this.httpClient.get<
        ListCustomersResponse,
        AxiosResponse<ListCustomersResponse>,
        ListCustomerArgs
      >(LIST_CUSTOMERS_ENDPOINT, {});

      if (data.status && isNonErrorResponse(status)) {
        return data.data;
      }

      return Promise.reject({ message: data.message });
    } catch (err) {
      return handleError(err);
    }
  }
}

export default CustomerModule;
