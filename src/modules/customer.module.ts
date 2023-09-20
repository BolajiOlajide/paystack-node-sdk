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
  GetCustomerArgs,
} from '../schema/customer.schema';
import { isNonErrorResponse } from '../utils/status.util';

import Base from './base.module';

class CustomerModule extends Base {
  private httpClient: AxiosInstance;

  constructor(httpClient: AxiosInstance) {
    super();
    this.httpClient = httpClient;
  }

  async create(args: CreateCustomerArgs): Promise<Customer> {
    return this.wrap(() => {
      createCustomerArgsSchema.parse(args);

      return this.httpClient.post<CreateCustomerResponse, AxiosResponse<CreateCustomerResponse>, CreateCustomerArgs>(
        CREATE_CUSTOMER_ENDPOINT,
        args
      );
    });
    // try {
    // createCustomerArgsSchema.parse(args);

    // const { data, status } = await this.httpClient.post<
    //   CreateCustomerResponse,
    //   AxiosResponse<CreateCustomerResponse>,
    //   CreateCustomerArgs
    // >(CREATE_CUSTOMER_ENDPOINT, args);

    //   if (data.status && isNonErrorResponse(status)) {
    //     return data.data;
    //   }

    //   return Promise.reject({ message: data.message });
    // } catch (err) {
    //   return handleError(err);
    // }
  }

  async list(args: ListCustomerArgs): Promise<Customer[]> {
    try {
      listCustomerArgsSchema.parse(args);

      // TODO: take account of pagination arguments
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

  // async get(args: GetCustomerArgs): Promise<Customer> {
  // }
}

export default CustomerModule;
