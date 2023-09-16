import type { AxiosInstance } from 'axios';
import { mock } from 'jest-mock-extended';

import Subscription from '../subscription.module';
import { ValidationError } from '../../error/validation.error';

import { CREATE_PLAN_ENDPOINT } from '../../constants';
// fixtures
import { mockPlan } from '../../fixtures/subscription.fixture';
import { StatusCodes } from '../../utils/status.util';

jest.mock('axios');

describe('Subscription', () => {
  const mockedAxios = mock<AxiosInstance>();
  const axiosPostSpy = jest.spyOn(mockedAxios, 'post');

  const s = new Subscription(mockedAxios);

  describe('createPlan', () => {
    it('should throw error if plan amount is less than or equal to zero', async () => {
      const expected = new ValidationError('amount must be greater than 0');
      await expect(
        s.createPlan({
          name: 'Plan Name',
          amount: -10000,
          interval: 'monthly',
        })
      ).rejects.toEqual(expected);

      expect(axiosPostSpy).not.toBeCalled();
    });

    it('should throw error if name is an empty string', async () => {
      const expected = new ValidationError('name must be a non-empty string');
      await expect(
        s.createPlan({
          name: '',
          amount: 10000,
          interval: 'monthly',
        })
      ).rejects.toEqual(expected);

      expect(axiosPostSpy).not.toBeCalled();
    });

    it('should create subscription plan', async () => {
      axiosPostSpy.mockResolvedValueOnce({
        status: StatusCodes.CREATED,
        data: {
          status: true,
          data: mockPlan,
        },
      });
      const plan = await s.createPlan({
        name: 'Plan Name',
        amount: 10000,
        interval: 'monthly',
      });

      expect(axiosPostSpy).toBeCalledWith(CREATE_PLAN_ENDPOINT, {
        name: 'Plan Name',
        amount: 10000,
        interval: 'monthly',
      });
      expect(axiosPostSpy).toBeCalledTimes(1);
      expect(plan).toEqual(mockPlan);
    });
  });
});
