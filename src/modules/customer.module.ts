import { AxiosInstance, AxiosResponse } from 'axios';

import {
  type CreateCustomerArgs,
  createCustomerArgsSchema,
  type CreateCustomerResponse,
  type Customer,
  listCustomerArgsSchema,
  type ListCustomerArgs,
  type ListCustomersResponse,
  type GetCustomerArgs,
  getCustomerArgsSchema,
  type GetCustomerResponse,
  updateCustomerArgsSchema,
  type UpdateCustomerArgs,
  type UpdateCustomerResponse,
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
      const url = createQueryForURL(this.endpoint, args || {});
      return this.httpClient.get<ListCustomersResponse, AxiosResponse<ListCustomersResponse>>(url);
    });
  }

  async get(args: GetCustomerArgs): Promise<Customer> {
    return this.wrap(() => {
      getCustomerArgsSchema.parse(args);

      const url = `${this.endpoint}/${args.email_or_code}`;
      return this.httpClient.get<GetCustomerResponse, AxiosResponse<GetCustomerResponse>>(url);
    });
  }

  async update(args: UpdateCustomerArgs): Promise<Customer> {
    return this.wrap(() => {
      updateCustomerArgsSchema.parse(args);

      const { code, ...data } = args;
      const url = `${this.endpoint}/${code}`;
      return this.httpClient.put<
        UpdateCustomerResponse,
        AxiosResponse<UpdateCustomerResponse>,
        Omit<UpdateCustomerArgs, 'code'>
      >(url, data);
    });
  }
}

export default CustomerModule;
