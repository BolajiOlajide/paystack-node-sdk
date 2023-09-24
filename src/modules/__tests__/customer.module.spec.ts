import type { AxiosInstance } from 'axios';
import { mock } from 'jest-mock-extended';

import { ValidationError } from '../../error/validation.error';
import { newMockCustomer } from '../../fixtures/customer.fixture';
import type {
  CreateCustomerArgs,
  GetCustomerArgs,
  UpdateCustomerArgs,
  ValidateCustomerArgs,
  WhitelistOrBlacklistArgs,
  DeactivateAuthorizationArgs,
} from '../../schema/customer.schema';
import { StatusCodes } from '../../utils/status.util';
import Customer from '../customer.module';

jest.mock('axios');

describe('CustomerModule', () => {
  const mockedAxios = mock<AxiosInstance>();
  const axiosPostSpy = jest.spyOn(mockedAxios, 'post');
  const axiosGetSpy = jest.spyOn(mockedAxios, 'get');
  const axiosPutSpy = jest.spyOn(mockedAxios, 'put');

  const customerModule = new Customer(mockedAxios);

  describe('create', () => {
    it('should return validation error when email is not defined', async () => {
      const expected = new ValidationError('email is required');
      await expect(customerModule.create({} as CreateCustomerArgs)).rejects.toEqual(expected);

      expect(axiosGetSpy).not.toBeCalled();
      expect(axiosPostSpy).not.toBeCalled();
    });

    it('should create customer', async () => {
      axiosPostSpy.mockResolvedValueOnce({
        status: StatusCodes.CREATED,
        data: {
          status: true,
          data: newMockCustomer,
        },
      });

      const customer = await customerModule.create({
        email: 'bolaji@test.com',
      });
      expect(axiosPostSpy).toBeCalledWith('/customer', {
        email: 'bolaji@test.com',
      });
      expect(axiosPostSpy).toBeCalledTimes(1);
      expect(axiosGetSpy).not.toBeCalled();
      expect(customer).toEqual(newMockCustomer);
    });
  });

  describe('list', () => {
    beforeEach(() => {
      axiosGetSpy.mockResolvedValueOnce({
        status: StatusCodes.OK,
        data: {
          status: true,
          data: [newMockCustomer],
        },
      });
    });

    describe('pagination', () => {
      it('when per_page is defined', async () => {
        await customerModule.list({ per_page: 50 });
        expect(axiosGetSpy).toBeCalledWith('/customer?per_page=50');
        expect(axiosGetSpy).toBeCalledTimes(1);
        expect(axiosPostSpy).not.toBeCalled();
      });

      it('when page is defined', async () => {
        await customerModule.list({ page: 2 });
        expect(axiosGetSpy).toBeCalledWith('/customer?page=2');
        expect(axiosGetSpy).toBeCalledTimes(1);
        expect(axiosPostSpy).not.toBeCalled();
      });
    });

    it('should list all customer', async () => {
      const customers = await customerModule.list({});
      expect(axiosGetSpy).toBeCalledWith('/customer');
      expect(axiosGetSpy).toBeCalledTimes(1);
      expect(axiosPostSpy).not.toBeCalled();
      expect(customers).toHaveLength(1);

      const [firstCustomer] = customers;
      expect(firstCustomer).toEqual(newMockCustomer);
    });
  });

  describe('get', () => {
    beforeEach(() => {
      axiosGetSpy.mockResolvedValueOnce({
        status: StatusCodes.OK,
        data: {
          status: true,
          data: newMockCustomer,
        },
      });
    });

    it("should return an eror when email_or_code isn't provided", async () => {
      const expected = new ValidationError('email_or_code is required');
      await expect(customerModule.get({} as GetCustomerArgs)).rejects.toEqual(expected);

      expect(axiosGetSpy).not.toBeCalled();
      expect(axiosPostSpy).not.toBeCalled();
    });

    it('should return the customer information', async () => {
      const emailOrCode = 'dshdkadaff';
      const customer = await customerModule.get({ email_or_code: 'dshdkadaff' });
      expect(axiosGetSpy).toBeCalledWith(`/customer/${emailOrCode}`);
      expect(axiosGetSpy).toBeCalledTimes(1);
      expect(axiosPostSpy).not.toBeCalled();
      expect(customer).toEqual(newMockCustomer);
    });
  });

  describe('update', () => {
    it('should throw an error when code is not provided', async () => {
      const expected = new ValidationError('code is required');
      await expect(customerModule.update({} as UpdateCustomerArgs)).rejects.toEqual(expected);

      expect(axiosGetSpy).not.toBeCalled();
      expect(axiosPostSpy).not.toBeCalled();
      expect(axiosPutSpy).not.toBeCalled();
    });

    it('should throw an error if no data to update is provided', async () => {
      const expected = new ValidationError('at least one field to update must be provided');
      await expect(customerModule.update({ code: '93203923' })).rejects.toEqual(expected);

      expect(axiosGetSpy).not.toBeCalled();
      expect(axiosPostSpy).not.toBeCalled();
      expect(axiosPutSpy).not.toBeCalled();
    });

    it('should return the updated customer info', async () => {
      const updatedCustomerInfo = {
        ...newMockCustomer,
        first_name: 'Korede',
      };
      axiosPutSpy.mockResolvedValueOnce({
        status: StatusCodes.OK,
        data: {
          status: true,
          data: updatedCustomerInfo,
        },
      });
      const code = '93203923';
      const customer = await customerModule.update({ code, first_name: 'Korede' });

      expect(axiosGetSpy).not.toBeCalled();
      expect(axiosPostSpy).not.toBeCalled();
      expect(axiosPutSpy).toBeCalledWith(`/customer/${code}`, {
        first_name: 'Korede',
      });
      expect(axiosPutSpy).toBeCalledTimes(1);
      expect(customer).toEqual(updatedCustomerInfo);
    });
  });

  describe('validate', () => {
    it("should throw an error if code isn't provided", async () => {
      const expected = new ValidationError('code is required');
      await expect(customerModule.validate({} as ValidateCustomerArgs)).rejects.toEqual(expected);

      expect(axiosGetSpy).not.toBeCalled();
      expect(axiosPostSpy).not.toBeCalled();
      expect(axiosPutSpy).not.toBeCalled();
    });

    it("should throw an error if type isn't provided", async () => {
      const expected = new ValidationError('Invalid literal value, expected "bank_account"');
      await expect(customerModule.validate({ code: '92032' } as ValidateCustomerArgs)).rejects.toEqual(expected);

      expect(axiosGetSpy).not.toBeCalled();
      expect(axiosPostSpy).not.toBeCalled();
      expect(axiosPutSpy).not.toBeCalled();
    });

    it("should throw an error if country isn't provided", async () => {
      const expected = new ValidationError('country is required');
      await expect(
        customerModule.validate({ code: '92032', type: 'bank_account' } as ValidateCustomerArgs)
      ).rejects.toEqual(expected);

      expect(axiosGetSpy).not.toBeCalled();
      expect(axiosPostSpy).not.toBeCalled();
      expect(axiosPutSpy).not.toBeCalled();
    });

    it("should throw an error if country isn't a 2-character value", async () => {
      const expected = new ValidationError('country must be a 2-character value');
      await expect(
        customerModule.validate({ code: '92032', type: 'bank_account', country: 'NGA' } as ValidateCustomerArgs)
      ).rejects.toEqual(expected);

      expect(axiosGetSpy).not.toBeCalled();
      expect(axiosPostSpy).not.toBeCalled();
      expect(axiosPutSpy).not.toBeCalled();
    });

    it("should throw an error if account_number isn't provided", async () => {
      const expected = new ValidationError('account_number is required');
      await expect(
        customerModule.validate({ code: '92032', type: 'bank_account', country: 'NG' } as ValidateCustomerArgs)
      ).rejects.toEqual(expected);

      expect(axiosGetSpy).not.toBeCalled();
      expect(axiosPostSpy).not.toBeCalled();
      expect(axiosPutSpy).not.toBeCalled();
    });

    it("should throw an error if bank_code isn't provided", async () => {
      const expected = new ValidationError('bank_code is required');
      await expect(
        customerModule.validate({
          code: '92032',
          type: 'bank_account',
          country: 'NG',
          account_number: '0001101023',
        } as ValidateCustomerArgs)
      ).rejects.toEqual(expected);

      expect(axiosGetSpy).not.toBeCalled();
      expect(axiosPostSpy).not.toBeCalled();
      expect(axiosPutSpy).not.toBeCalled();
    });

    it("should throw an error if bvn isn't provided", async () => {
      const expected = new ValidationError('bvn is required');
      await expect(
        customerModule.validate({
          code: '92032',
          type: 'bank_account',
          country: 'NG',
          account_number: '0001101023',
          bank_code: '052',
        } as ValidateCustomerArgs)
      ).rejects.toEqual(expected);

      expect(axiosGetSpy).not.toBeCalled();
      expect(axiosPostSpy).not.toBeCalled();
      expect(axiosPutSpy).not.toBeCalled();
    });

    it("should throw an error if bvn isn't 11-characters", async () => {
      const expected = new ValidationError('bvn must consist of 11 digits');
      await expect(
        customerModule.validate({
          code: '92032',
          type: 'bank_account',
          country: 'NG',
          account_number: '0001101023',
          bank_code: '052',
          bvn: '09129323',
        } as ValidateCustomerArgs)
      ).rejects.toEqual(expected);

      expect(axiosGetSpy).not.toBeCalled();
      expect(axiosPostSpy).not.toBeCalled();
      expect(axiosPutSpy).not.toBeCalled();
    });

    it("should throw an error if first_name isn't provided", async () => {
      const expected = new ValidationError('first_name is required');
      await expect(
        customerModule.validate({
          code: '92032',
          type: 'bank_account',
          country: 'NG',
          account_number: '0001101023',
          bank_code: '052',
          bvn: '09129323000',
        } as ValidateCustomerArgs)
      ).rejects.toEqual(expected);

      expect(axiosGetSpy).not.toBeCalled();
      expect(axiosPostSpy).not.toBeCalled();
      expect(axiosPutSpy).not.toBeCalled();
    });

    it('should return a validation message if successful', async () => {
      axiosPostSpy.mockResolvedValueOnce({
        status: StatusCodes.OK,
        data: {
          status: true,
          message: 'Customer validation in progress',
        },
      });
      const customerCode = '92032ewqoj';
      const message = await customerModule.validate({
        code: customerCode,
        type: 'bank_account',
        country: 'NG',
        account_number: '0001101023',
        bank_code: '052',
        bvn: '09129323000',
        first_name: 'Korede',
      });
      expect(message).toEqual('Customer validation in progress');
      expect(axiosPostSpy).toBeCalledWith(`/customer/${customerCode}/identification`, {
        type: 'bank_account',
        country: 'NG',
        account_number: '0001101023',
        bank_code: '052',
        bvn: '09129323000',
        first_name: 'Korede',
      });
      expect(axiosPostSpy).toBeCalledTimes(1);
      expect(axiosGetSpy).not.toBeCalled();
      expect(axiosPutSpy).not.toBeCalled();
    });
  });

  describe('whitelistOrBlacklist', () => {
    it("should throw an error when customer isn't provided", async () => {
      const expected = new ValidationError('customer is required');
      await expect(customerModule.whitelistOrBlacklist({} as WhitelistOrBlacklistArgs)).rejects.toEqual(expected);

      expect(axiosGetSpy).not.toBeCalled();
      expect(axiosPostSpy).not.toBeCalled();
      expect(axiosPutSpy).not.toBeCalled();
    });

    it('should whitelist or blacklist a customer', async () => {
      axiosPostSpy.mockResolvedValueOnce({
        status: StatusCodes.OK,
        data: {
          status: true,
          data: newMockCustomer,
        },
      });

      await customerModule.whitelistOrBlacklist({ customer: '93022121', risk_action: 'deny' });

      expect(axiosPostSpy).toBeCalledWith('/customer/set_risk_action', { customer: '93022121', risk_action: 'deny' });
      expect(axiosPostSpy).toBeCalledTimes(1);
      expect(axiosGetSpy).not.toBeCalled();
      expect(axiosPutSpy).not.toBeCalled();
    });
  });

  describe('deactivateAuthorization', () => {
    it("should throw an error when authorization_code isn't provided", async () => {
      const expected = new ValidationError('authorization_code is required');
      await expect(customerModule.deactivateAuthorization({} as DeactivateAuthorizationArgs)).rejects.toEqual(expected);

      expect(axiosGetSpy).not.toBeCalled();
      expect(axiosPostSpy).not.toBeCalled();
      expect(axiosPutSpy).not.toBeCalled();
    });

    it('should deactive an authorization', async () => {
      axiosPostSpy.mockResolvedValueOnce({
        status: StatusCodes.OK,
        data: {
          status: true,
          message: 'Authorization deactivated',
        },
      });

      const message = await customerModule.deactivateAuthorization({ authorization_code: 'auth123' });
      expect(message).toEqual('Authorization deactivated');
    });
  });
});
