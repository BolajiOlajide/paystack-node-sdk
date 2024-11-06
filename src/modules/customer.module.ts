import { handleError } from '../error';
import type { HttpClient } from '../http';
import { withMetaSchema, type WithMeta } from '../schema/base.schema';
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
  customerSchema,
  validateCustomerResponseSchema,
} from '../schema/customer.schema';
import { transactionSchema } from '../schema/transaction.schema';
import { parseHttpResponse } from '../utils/parse.util';
import { createQueryForURL } from '../utils/query.util';
import { isNonErrorResponse } from '../utils/status.util';

import { Base } from './base.module';

export class CustomerModule extends Base {
  private endpoint: string = '/customer';

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  async create(args: CreateCustomerArgs): Promise<Customer> {
    try {
      createCustomerArgsSchema.parse(args);
      const result = await this._post<Customer, CreateCustomerArgs>(this.endpoint, args);

      if (result.status) {
        return result.data;
      }
      return Promise.reject({ message: result.message });
    } catch (err) {
      return Promise.reject({ message: (err as Error).message });
    }
  }

  async list(args: ListCustomerArgs): Promise<WithMeta<Customer>> {
    try {
      const transformedArgs = listCustomerArgsSchema.parse(args || {});
      const url = createQueryForURL(this.endpoint, transformedArgs);
      const result = await this._get<WithMeta<Customer>>(url);

      if (result.status) {
        return result.data;
      }

      return Promise.reject({ message: result.message });
    } catch (err) {
      return Promise.reject({ message: (err as Error).message });
    }
  }

  async get(args: GetCustomerArgs): Promise<Customer> {
    try {
      getCustomerArgsSchema.parse(args);
      const url = `${this.endpoint}/${args.email_or_code}`;
      const result = await this._get<Customer>(url);

      if (result.status) {
        return result.data;
      }

      return Promise.reject({ message: result.message });
    } catch (err) {
      return Promise.reject({ message: (err as Error).message });
    }
  }

  async update(args: UpdateCustomerArgs): Promise<Customer> {
    updateCustomerArgsSchema.parse(args);

    const { code, ...data } = args;
    const url = `${this.endpoint}/${code}`;
    const result = await this._put<Customer, Omit<UpdateCustomerArgs, 'code'>>(url, data);

    if (result.status) {
      return result.data;
    }

    return Promise.reject({ message: result.message });
  }

  // async validate(args: ValidateCustomerArgs): Promise<ValidateCustomerResponse> {
  //   validateCustomerArgsSchema.parse(args);

  //   const { code, ...rest } = args;
  //   const url = `${this.endpoint}/${code}/identification`;
  //   const result = await this._post<ValidateCustomerResponse, Omit<ValidateCustomerArgs, 'code'>>(url, rest);

  //   if (result.status) {
  //     return result.message;
  //   }

  //   return Promise.reject({ message: result.message });
  // }

  // whitelistOrBlacklist(args: WhitelistOrBlacklistArgs): Promise<Customer> {
  //   return this.wrap(() => {
  //     whitelistOrBlacklistArgsSchema.parse(args);
  //     const url = `${this.endpoint}/set_risk_action`;
  //     return this.httpClient.post<
  //       WhitelistOrBlacklistResponse,
  //       AxiosResponse<WhitelistOrBlacklistResponse>,
  //       WhitelistOrBlacklistArgs
  //     >(url, args);
  //   });
  // }

  // // We don't use the wraper here because the response we need from
  // // this endpoint is in `data.message`, regardless of whether it's
  // // successful or not.
  // async deactivateAuthorization(args: DeactivateAuthorizationArgs): Promise<string> {
  //   try {
  //     deactivateAuthorizationArgsSchema.parse(args);

  //     const url = `${this.endpoint}/deactivate_authorization`;
  //     const { data, status } = await this.httpClient.post<ValidateCustomerResponse>(url, args);
  //     if (data.status && isNonErrorResponse(status)) {
  //       return data.message;
  //     }

  //     return Promise.reject({ message: data.message });
  //   } catch (err) {
  //     return handleError(err);
  //   }
  // }
}
