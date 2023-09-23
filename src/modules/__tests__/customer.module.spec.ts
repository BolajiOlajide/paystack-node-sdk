import type { AxiosInstance } from 'axios';
import { mock } from 'jest-mock-extended';

import { ValidationError } from '../../error/validation.error';
import { newMockCustomer } from '../../fixtures/customer.fixture';
import type { CreateCustomerArgs, GetCustomerArgs } from '../../schema/customer.schema';
import { StatusCodes } from '../../utils/status.util';
import Customer from '../customer.module';

jest.mock('axios');

describe('CustomerModule', () => {
  const mockedAxios = mock<AxiosInstance>();
  const axiosPostSpy = jest.spyOn(mockedAxios, 'post');
  const axiosGetSpy = jest.spyOn(mockedAxios, 'get');

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
      axiosGetSpy.mockResolvedValue({
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
      axiosGetSpy.mockResolvedValue({
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
});
