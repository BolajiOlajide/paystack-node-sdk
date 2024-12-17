import { http, HttpResponse } from 'msw';
import { test, expect, describe, afterEach } from 'vitest';

import { PAYSTACK_BASE_API_URL } from '../../constants';
import { ValidationError } from '../../error/validation.error';
import { mockCustomers, newMockCustomer } from '../../fixtures/customer.fixture';
import { HttpClient } from '../../http';
import { createResponse } from '../../mocks/handlers/utils';
import { server } from '../../mocks/server';
import type {
  CreateCustomerArgs,
  DeactivateAuthorizationArgs,
  GetCustomerArgs,
  UpdateCustomerArgs,
  ValidateCustomerArgs,
  WhitelistOrBlacklistArgs,
} from '../../schema/customer.schema';
import { CustomerModule } from '../customer.module';

afterEach(() => {
  server.resetHandlers();
});

describe('CustomerModule', () => {
  const httpClient = new HttpClient(PAYSTACK_BASE_API_URL, 'sk_test_1234567890');
  const customerModule = new CustomerModule(httpClient);

  describe('create', () => {
    test('should return validation error when email is not passed', async () => {
      const expected = new ValidationError('email is required');
      await expect(customerModule.create({} as CreateCustomerArgs)).rejects.toEqual(expected);
    });

    test('should create customer', async () => {
      const customer = await customerModule.create({ email: 'bolaji@test.com' });
      expect(customer).toEqual(newMockCustomer);
    });

    test('should return an error if customer creation fails', async () => {
      server.use(
        http.post(`${PAYSTACK_BASE_API_URL}/customer`, () =>
          HttpResponse.json(createResponse<null>(false, 'Customer creation failed', null))
        )
      );
      const expected = new Error('Customer creation failed');
      await expect(customerModule.create({ email: 'bolaji@test.com' })).rejects.toEqual(expected);
    });
  });

  describe('list', () => {
    test('should return a paginated list of customers', async () => {
      const response = await customerModule.list({});
      expect(response).toEqual({
        data: mockCustomers,
        meta: {
          total: mockCustomers.length,
          skipped: 0,
          perPage: 50,
          page: 1,
          pageCount: 1,
        },
      });
    });
  });

  describe('get', () => {
    test('email_or_code is required', async () => {
      const expected = new ValidationError('email_or_code is required');
      await expect(customerModule.get({} as GetCustomerArgs)).rejects.toEqual(expected);
    });

    test('should return a customer', async () => {
      const customer = await customerModule.get({ email_or_code: 'bolaji@test.com' });
      expect(customer).toEqual(newMockCustomer);
    });
  });

  describe('update', () => {
    test('code is required', async () => {
      const expected = new ValidationError('code is required');
      await expect(customerModule.update({} as UpdateCustomerArgs)).rejects.toEqual(expected);
    });

    test('one of the user fields must be provided', async () => {
      const expected = new ValidationError(
        "at least one field to update must be provided. Options: [ 'first_name', 'last_name', 'phone', 'metadata' ]"
      );
      await expect(customerModule.update({ code: 'CUS_1234567890' })).rejects.toEqual(expected);
    });

    test('should update a customer', async () => {
      const customer = await customerModule.update({ code: 'CUS_1234567890', first_name: 'Bolaji' });
      expect(customer).toEqual(newMockCustomer);
    });
  });

  describe('validate', () => {
    test('code is required', async () => {
      const expected = new ValidationError('code is required');
      await expect(customerModule.validate({} as ValidateCustomerArgs)).rejects.toEqual(expected);
    });

    test('type is required', async () => {
      const expected = new ValidationError('type is required');
      await expect(customerModule.validate({ code: 'CUS_1234567890' } as ValidateCustomerArgs)).rejects.toEqual(
        expected
      );
    });

    test('country is required', async () => {
      const expected = new ValidationError('country is required');
      await expect(
        customerModule.validate({ code: 'CUS_1234567890', type: 'bank_account' } as ValidateCustomerArgs)
      ).rejects.toEqual(expected);
    });

    test('account_number is required', async () => {
      const expected = new ValidationError('account_number is required');
      await expect(
        customerModule.validate({ code: 'CUS_1234567890', type: 'bank_account', country: 'NG' } as ValidateCustomerArgs)
      ).rejects.toEqual(expected);
    });

    test('bank_code is required', async () => {
      const expected = new ValidationError('bank_code is required');
      await expect(
        customerModule.validate({
          code: 'CUS_1234567890',
          type: 'bank_account',
          country: 'NG',
          account_number: '1234567890',
        } as ValidateCustomerArgs)
      ).rejects.toEqual(expected);
    });

    test('bvn is required', async () => {
      const expected = new ValidationError('bvn is required');
      await expect(
        customerModule.validate({
          code: 'CUS_1234567890',
          type: 'bank_account',
          country: 'NG',
          account_number: '1234567890',
          bank_code: 'GTB',
        } as ValidateCustomerArgs)
      ).rejects.toEqual(expected);
    });

    test('bvn must be 11 characters', async () => {
      const expected = new ValidationError('bvn must consist of 11 digits');
      await expect(
        customerModule.validate({
          code: 'CUS_1234567890',
          type: 'bank_account',
          country: 'NG',
          account_number: '1234567890',
          bank_code: 'GTB',
          bvn: '1234',
        } as ValidateCustomerArgs)
      ).rejects.toEqual(expected);
    });

    test('first_name is required', async () => {
      const expected = new ValidationError('first_name is required');
      await expect(
        customerModule.validate({
          code: 'CUS_1234567890',
          type: 'bank_account',
          country: 'NG',
          account_number: '1234567890',
          bank_code: 'GTB',
          bvn: '12345678901',
        } as ValidateCustomerArgs)
      ).rejects.toEqual(expected);
    });

    test('should validate a customer', async () => {
      const response = await customerModule.validate({
        code: 'CUS_1234567890',
        type: 'bank_account',
        country: 'NG',
        account_number: '1234567890',
        bank_code: 'GTB',
        bvn: '12345678901',
        first_name: 'Bolaji',
      });
      expect(response).toEqual('Customer validated successfully');
    });
  });

  describe('whitelistOrBlacklist', () => {
    test('customer is required', async () => {
      const expected = new ValidationError('customer is required');
      await expect(customerModule.whitelistOrBlacklist({} as WhitelistOrBlacklistArgs)).rejects.toEqual(expected);
    });

    test('should whitelist or blacklist a customer', async () => {
      const response = await customerModule.whitelistOrBlacklist({
        customer: newMockCustomer.customer_code,
        risk_action: 'allow',
      });
      expect(response).toEqual(newMockCustomer);
    });
  });

  describe('deactivateAuthorization', () => {
    test('authorization_code is required', async () => {
      const expected = new ValidationError('authorization_code is required');
      await expect(customerModule.deactivateAuthorization({} as DeactivateAuthorizationArgs)).rejects.toEqual(expected);
    });

    test('should deactivate an authorization', async () => {
      const response = await customerModule.deactivateAuthorization({ authorization_code: 'AUTH_1234567890' });
      expect(response).toEqual('Authorization deactivated successfully');
    });
  });
});
