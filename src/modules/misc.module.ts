import { handleModuleError } from '../error';
import type { HttpClient } from '../http';
import type { Bank } from '../schema/bank.schema';
import type { Country, State } from '../schema/country.schema';
import {
  type ListCountryResponse,
  type ListStatesArgs,
  listStatesArgsSchema,
  type ListStatesResponse,
  type ListBanksResponse,
  type ListBanksArgs,
  listBanksArgsSchema,
} from '../schema/misc.schema';
import { createQueryForURL } from '../utils/query.util';

import { Base } from './base.module';

/**
 * The Miscellaneous API are supporting APIs that can be used to provide more details to other APIs.
 *
 * https://paystack.com/docs/api/miscellaneous/
 */
export class MiscellaneousModule extends Base {
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  async listCountries(): Promise<Country[]> {
    try {
      const result = await this._get<Country[]>('/country');
      if (result.status) {
        return result.data;
      }
      return Promise.reject(new Error(result.message));
    } catch (err) {
      return handleModuleError(err);
    }
  }

  async listStates(args: ListStatesArgs): Promise<State[]> {
    try {
      listStatesArgsSchema.parse(args);
      const url = createQueryForURL('/address_verification/states', args);
      const result = await this._get<State[]>(url);
      if (result.status) {
        return result.data;
      }
      return Promise.reject(new Error(result.message));
    } catch (err) {
      return handleModuleError(err);
    }
  }

  async listBanks(args: ListBanksArgs): Promise<Bank[]> {
    try {
      listBanksArgsSchema.parse(args);
      const url = createQueryForURL('/bank', args);
      const result = await this._get<Bank[]>(url);
      if (result.status) {
        return result.data;
      }
      return Promise.reject(new Error(result.message));
    } catch (err) {
      return handleModuleError(err);
    }
  }
}
