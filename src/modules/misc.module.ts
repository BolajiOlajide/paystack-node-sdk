import type { AxiosInstance } from 'axios';

import { type Country } from '../schema/country.schema';
import { type ListCountryResponse } from '../schema/misc.schema';

import Base from './base.module';

class MiscellanouseModule extends Base {
  constructor(httpClient: AxiosInstance) {
    super(httpClient);
  }

  listCountries(): Promise<Country[]> {
    return this.wrap(() => {
      return this.httpClient.get<ListCountryResponse>('/country');
    });
  }
}

export default MiscellanouseModule;
