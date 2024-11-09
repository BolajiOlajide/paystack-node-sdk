import { handleModuleError } from '../error';
import type { HttpClient } from '../http';
import { updateTimeoutArgsSchema, type Integration, type UpdateTimeoutArgs } from '../schema/integration.schema';

import { Base } from './base.module';

/**
 * The Integration API are endpoints that can be used to manage integrations.
 *
 * https://paystack.com/docs/api/integration/
 */
export class IntegrationModule extends Base {
  private endpoint: string = '/integration';

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  async fetchTimeout(): Promise<Integration> {
    try {
      const result = await this._get<Integration>(`${this.endpoint}/payment_session_timeout`);
      if (result.status) {
        return result.data;
      }
      return Promise.reject(new Error(result.message));
    } catch (err) {
      return handleModuleError(err);
    }
  }

  async updateTimeout(args: UpdateTimeoutArgs): Promise<Integration> {
    try {
      updateTimeoutArgsSchema.parse(args);
      const result = await this._put<Integration, UpdateTimeoutArgs>(`${this.endpoint}/payment_session_timeout`, args);
      if (result.status) {
        return result.data;
      }
      return Promise.reject(new Error(result.message));
    } catch (err) {
      return handleModuleError(err);
    }
  }
}
