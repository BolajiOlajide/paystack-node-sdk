import { handleModuleError } from '../error';
import type { HttpClient } from '../http';
import { type WithMeta } from '../schema/base.schema';
import {
  type CreateCustomerArgs,
  createCustomerArgsSchema,
  type Customer,
  listCustomerArgsSchema,
  type ListCustomerArgs,
  type GetCustomerArgs,
  getCustomerArgsSchema,
  updateCustomerArgsSchema,
  type UpdateCustomerArgs,
  type ValidateCustomerArgs,
  validateCustomerArgsSchema,
  whitelistOrBlacklistArgsSchema,
  type WhitelistOrBlacklistArgs,
  deactivateAuthorizationArgsSchema,
  type DeactivateAuthorizationArgs,
} from '../schema/customer.schema';
import { createQueryForURL } from '../utils/query.util';

import { Base } from './base.module';

/**
 * The Customer API are endpoints that can be used to manage customers.
 *
 * https://paystack.com/docs/api/customer/
 */
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
      return Promise.reject(new Error(result.message));
    } catch (err) {
      return handleModuleError(err);
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

      return Promise.reject(new Error(result.message));
    } catch (err) {
      return handleModuleError(err);
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

      return Promise.reject(new Error(result.message));
    } catch (err) {
      return handleModuleError(err);
    }
  }

  async update(args: UpdateCustomerArgs): Promise<Customer> {
    try {
      updateCustomerArgsSchema.parse(args);

      const { code, ...data } = args;
      const url = `${this.endpoint}/${code}`;
      const result = await this._put<Customer, Omit<UpdateCustomerArgs, 'code'>>(url, data);

      if (result.status) {
        return result.data;
      }

      return Promise.reject(new Error(result.message));
    } catch (err) {
      return handleModuleError(err);
    }
  }

  async validate(args: ValidateCustomerArgs): Promise<string> {
    try {
      validateCustomerArgsSchema.parse(args);

      const { code, ...rest } = args;
      const url = `${this.endpoint}/${code}/identification`;
      const result = await this._post<never, Omit<ValidateCustomerArgs, 'code'>>(url, rest);

      if (result.status) {
        return result.message;
      }

      return Promise.reject(new Error(result.message));
    } catch (err) {
      return handleModuleError(err);
    }
  }

  async whitelistOrBlacklist(args: WhitelistOrBlacklistArgs): Promise<Customer> {
    try {
      whitelistOrBlacklistArgsSchema.parse(args);
      const url = `${this.endpoint}/set_risk_action`;
      const result = await this._post<Customer, WhitelistOrBlacklistArgs>(url, args);

      if (result.status) {
        return result.data;
      }

      return Promise.reject(new Error(result.message));
    } catch (err) {
      return handleModuleError(err);
    }
  }

  async deactivateAuthorization(args: DeactivateAuthorizationArgs): Promise<string> {
    try {
      deactivateAuthorizationArgsSchema.parse(args);

      const url = `${this.endpoint}/deactivate_authorization`;
      const result = await this._post<never, DeactivateAuthorizationArgs>(url, args);

      if (result.status) {
        return result.data;
      }

      return Promise.reject(new Error(result.message));
    } catch (err) {
      return handleModuleError(err);
    }
  }
}
