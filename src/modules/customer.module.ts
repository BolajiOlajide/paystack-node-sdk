import { AxiosInstance, AxiosResponse } from 'axios';

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
import { createQueryForURL } from '../utils/query.util';

import Base from './base.module';

class CustomerModule extends Base {
  private httpClient: AxiosInstance;
  private endpoint: string = '/customer';

  constructor(httpClient: AxiosInstance) {
    super();
    this.httpClient = httpClient;
  }

  async create(args: CreateCustomerArgs): Promise<Customer> {
    return this.wrap(() => {
      createCustomerArgsSchema.parse(args);

      return this.httpClient.post<CreateCustomerResponse, AxiosResponse<CreateCustomerResponse>, CreateCustomerArgs>(
        this.endpoint,
        args
      );
    });
  }

  async list(args: ListCustomerArgs): Promise<Customer[]> {
    return this.wrap(() => {
      listCustomerArgsSchema.parse(args);

      const url = createQueryForURL(this.endpoint, args);

      return this.httpClient.get<ListCustomersResponse, AxiosResponse<ListCustomersResponse>, ListCustomerArgs>(
        url,
        {}
      );
    });
  }

  // async get(args: GetCustomerArgs): Promise<Customer> {
  // }
}

export default CustomerModule;
