import { handleModuleError } from '../error';
import type { HttpClient } from '../http';
import type { WithMeta } from '../schema/base.schema';
import {
  createRefundArgsSchema,
  fetchRefundArgsSchema,
  listRefundsArgsSchema,
  type CreateRefundArgs,
  type FetchRefundArgs,
  type ListRefundsArgs,
  type NewRefund,
  type Refund,
} from '../schema/refund.schema';
import { createQueryForURL } from '../utils/query.util';

import { Base } from './base.module';

/**
 * The Refunds API allows you create and manage transaction refunds.
 *
 * https://paystack.com/docs/api/refund/
 */
export class RefundModule extends Base {
  private endpoint: string = '/refund';

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  async create(args: CreateRefundArgs): Promise<NewRefund> {
    try {
      createRefundArgsSchema.parse(args);
      const result = await this._post<NewRefund, CreateRefundArgs>(this.endpoint, args);
      if (result.status) {
        return result.data;
      }
      return Promise.reject(new Error(result.message));
    } catch (err) {
      return handleModuleError(err);
    }
  }

  async list(args?: ListRefundsArgs): Promise<WithMeta<Refund>> {
    try {
      listRefundsArgsSchema.parse(args);
      const url = createQueryForURL(this.endpoint, args || {});
      const result = await this._get<Refund[]>(url);
      if (result.status) {
        return {
          data: result.data,
          meta: result.meta!,
        };
      }
      return Promise.reject(new Error(result.message));
    } catch (err) {
      return handleModuleError(err);
    }
  }

  async fetch(args: FetchRefundArgs): Promise<Refund> {
    try {
      fetchRefundArgsSchema.parse(args);
      const result = await this._get<Refund>(`${this.endpoint}/${args.id}`);
      if (result.status) {
        return result.data;
      }
      return Promise.reject(new Error(result.message));
    } catch (err) {
      return handleModuleError(err);
    }
  }
}
