import type { AxiosInstance } from 'axios';
import { mock } from 'jest-mock-extended';

import { ValidationError } from '../../error/validation.error';
import { mockPlan } from '../../fixtures/plan.fixture';
import { StatusCodes } from '../../utils/status.util';
import Plan from '../plan.module';

jest.mock('axios');

describe('PlanModule', () => {
  const mockedAxios = mock<AxiosInstance>();
  const axiosPostSpy = jest.spyOn(mockedAxios, 'post');

  const planModule = new Plan(mockedAxios);

  describe('create', () => {
    it('should throw error if plan amount is less than or equal to zero', async () => {
      const expected = new ValidationError('amount must be greater than 0');
      await expect(
        planModule.create({
          name: 'Plan Name',
          amount: -10000,
          interval: 'monthly',
        })
      ).rejects.toEqual(expected);
    });

    it('should throw error if name is an empty string', async () => {
      const expected = new ValidationError('name must be a non-empty string');
      await expect(
        planModule.create({
          name: '',
          amount: 10000,
          interval: 'monthly',
        })
      ).rejects.toEqual(expected);
    });

    it('should create plan', async () => {
      axiosPostSpy.mockResolvedValueOnce({
        status: StatusCodes.CREATED,
        data: {
          status: true,
          data: mockPlan,
        },
      });
      const plan = await planModule.create({
        name: 'Plan Name',
        amount: 10000,
        interval: 'monthly',
      });

      expect(axiosPostSpy).toBeCalledWith('/plan', {
        name: 'Plan Name',
        amount: 10000,
        interval: 'monthly',
      });
      expect(axiosPostSpy).toBeCalledTimes(1);
      expect(plan).toEqual(mockPlan);
    });
  });
});
