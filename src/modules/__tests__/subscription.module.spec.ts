import axios from 'axios';

import Subscription from '../subscription.module';
import { ValidationError } from '../../error/validation.error';
import { CREATE_PLAN_ENDPOINT } from '../../endpoints';

// fixtures
import { mockPlan } from '../../fixtures/subscription.fixture';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Subscription', () => {
  mockedAxios.post.mockResolvedValue({
    status: 201,
    data: {
      status: true,
      data: mockPlan,
    },
  });
  const s = new Subscription(mockedAxios);

  describe('createPlan', () => {
    it('amount is negative', async () => {
      const expected = new ValidationError('amount must be greater than 0');
      await expect(
        s.createPlan({
          name: 'Plan Name',
          amount: -10000,
          interval: 'monthly',
        })
      ).rejects.toEqual(expected);

      expect(mockedAxios.post).not.toBeCalled();
    });

    it('name is empty string', async () => {
      const expected = new ValidationError('name must be a non-empty string');
      await expect(
        s.createPlan({
          name: '',
          amount: 10000,
          interval: 'monthly',
        })
      ).rejects.toEqual(expected);

      expect(mockedAxios.post).not.toBeCalled();
    });

    it('makes request to paystack /plan endpoint', async () => {
      const plan = await s.createPlan({
        name: 'Plan Name',
        amount: 10000,
        interval: 'monthly',
      });

      expect(mockedAxios.post).toBeCalledWith(CREATE_PLAN_ENDPOINT, {
        name: 'Plan Name',
        amount: 10000,
        interval: 'monthly',
      });
      expect(mockedAxios.post).toBeCalledTimes(1);
      expect(plan).toEqual(mockPlan);
    });
  });
});
