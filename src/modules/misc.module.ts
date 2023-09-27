import type { AxiosInstance } from 'axios';

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

import Base from './base.module';

/**
 * The Miscellaneous API are supporting APIs that can be used to provide more details to other APIs.
 *
 * https://docs-v2.paystack.com/docs/api/miscellaneous/
 */
class MiscellanouseModule extends Base {
  constructor(httpClient: AxiosInstance) {
    super(httpClient);
  }

  listCountries(): Promise<Country[]> {
    return this.wrap(() => {
      return this.httpClient.get<ListCountryResponse>('/country');
    });
  }

  listStates(args: ListStatesArgs): Promise<State[]> {
    return this.wrap(() => {
      listStatesArgsSchema.parse(args);
      const url = createQueryForURL('/address_verification/states', args);
      return this.httpClient.get<ListStatesResponse>(url);
    });
  }

  listBanks(args: ListBanksArgs): Promise<Bank[]> {
    return this.wrap(() => {
      listBanksArgsSchema.parse(args);
      const url = createQueryForURL('/bank', args);
      return this.httpClient.get<ListBanksResponse>(url);
    });
  }
}

export default MiscellanouseModule;
