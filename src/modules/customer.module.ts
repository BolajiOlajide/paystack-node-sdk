import { AxiosInstance, AxiosResponse } from 'axios';

import { handleError } from '../error';
import type { WithMeta } from '../schema/base.schema';
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
  type ValidateCustomerArgs,
  validateCustomerArgsSchema,
  type ValidateCustomerResponse,
  whitelistOrBlacklistArgsSchema,
  type WhitelistOrBlacklistArgs,
  type WhitelistOrBlacklistResponse,
  type DeactivateAuthorizationArgs,
  deactivateAuthorizationArgsSchema,
} from '../schema/customer.schema';
import { createQueryForURL } from '../utils/query.util';
import { isNonErrorResponse } from '../utils/status.util';

import Base from './base.module';

class CustomerModule extends Base {
  private endpoint: string = '/customer';

  constructor(httpClient: AxiosInstance) {
    super(httpClient);
  }

  create(args: CreateCustomerArgs): Promise<Customer> {
    return this.wrap(() => {
      createCustomerArgsSchema.parse(args);

      return this.httpClient.post<CreateCustomerResponse, AxiosResponse<CreateCustomerResponse>, CreateCustomerArgs>(
        this.endpoint,
        args
      );
    });
  }

  list(args: ListCustomerArgs): Promise<WithMeta<Customer>> {
    return this.wrapWithMeta(() => {
      listCustomerArgsSchema.parse(args);
      const url = createQueryForURL(this.endpoint, args || {});
      return this.httpClient.get<ListCustomersResponse, AxiosResponse<ListCustomersResponse>>(url);
    });
  }

  get(args: GetCustomerArgs): Promise<Customer> {
    return this.wrap(() => {
      getCustomerArgsSchema.parse(args);

      const url = `${this.endpoint}/${args.email_or_code}`;
      return this.httpClient.get<GetCustomerResponse, AxiosResponse<GetCustomerResponse>>(url);
    });
  }

  update(args: UpdateCustomerArgs): Promise<Customer> {
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

  // We don't use the wraper here because the response we need from
  // this endpoint is in `data.message`, regardless of whether it's
  // successful or not.
  async validate(args: ValidateCustomerArgs): Promise<string> {
    try {
      validateCustomerArgsSchema.parse(args);

      const { code, ...rest } = args;
      const url = `${this.endpoint}/${code}/identification`;
      const { data, status } = await this.httpClient.post<ValidateCustomerResponse>(url, rest);
      if (data.status && isNonErrorResponse(status)) {
        return data.message;
      }

      return Promise.reject({ message: data.message });
    } catch (err) {
      return handleError(err);
    }
  }

  whitelistOrBlacklist(args: WhitelistOrBlacklistArgs): Promise<Customer> {
    return this.wrap(() => {
      whitelistOrBlacklistArgsSchema.parse(args);
      const url = `${this.endpoint}/set_risk_action`;
      return this.httpClient.post<
        WhitelistOrBlacklistResponse,
        AxiosResponse<WhitelistOrBlacklistResponse>,
        WhitelistOrBlacklistArgs
      >(url, args);
    });
  }

  // We don't use the wraper here because the response we need from
  // this endpoint is in `data.message`, regardless of whether it's
  // successful or not.
  async deactivateAuthorization(args: DeactivateAuthorizationArgs): Promise<string> {
    try {
      deactivateAuthorizationArgsSchema.parse(args);

      const url = `${this.endpoint}/deactivate_authorization`;
      const { data, status } = await this.httpClient.post<ValidateCustomerResponse>(url, args);
      if (data.status && isNonErrorResponse(status)) {
        return data.message;
      }

      return Promise.reject({ message: data.message });
    } catch (err) {
      return handleError(err);
    }
  }
}

export default CustomerModule;
