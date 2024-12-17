import { test, expect, afterEach, describe } from 'vitest';

import { PAYSTACK_BASE_API_URL } from '../../constants';
import { ValidationError } from '../../error/validation.error';
import { mockBanks } from '../../fixtures/bank.fixture';
import { mockCountries, mockStates } from '../../fixtures/country.fixture';
import { HttpClient } from '../../http';
import { server } from '../../mocks/server';
import { ListStatesArgs } from '../../schema/misc.schema';
import { MiscellaneousModule } from '../misc.module';

afterEach(() => {
  server.resetHandlers();
});

describe('MiscModule', () => {
  const httpClient = new HttpClient(PAYSTACK_BASE_API_URL, 'sk_test_1234567890');
  const miscModule = new MiscellaneousModule(httpClient);

  test('listCountries', async () => {
    const countries = await miscModule.listCountries();
    expect(countries).toEqual(mockCountries);
  });

  describe('listStates', () => {
    test('should return an error when country is not provided', async () => {
      const expected = new ValidationError('country is required');
      await expect(miscModule.listStates({} as ListStatesArgs)).rejects.toEqual(expected);
    });

    test('should return a list of states', async () => {
      const states = await miscModule.listStates({ country: 'NG' });
      expect(states).toEqual(mockStates);
    });
  });

  describe('listBanks', () => {
    test('should return a list of banks', async () => {
      const banks = await miscModule.listBanks({});
      expect(banks).toEqual(mockBanks);
    });
  });
});
