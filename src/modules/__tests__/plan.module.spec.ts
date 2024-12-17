import { test, expect, afterEach, describe } from 'vitest';

import { PAYSTACK_BASE_API_URL } from '../../constants';
import { ValidationError } from '../../error/validation.error';
import { mockPlan } from '../../fixtures/plan.fixture';
import { HttpClient } from '../../http';
import { server } from '../../mocks/server';
import { CreatePlanArgs, UpdatePlanArgs } from '../../schema/plan.schema';
import { PlanModule } from '../plan.module';

afterEach(() => {
  server.resetHandlers();
});

describe('PlanModule', () => {
  const httpClient = new HttpClient(PAYSTACK_BASE_API_URL, 'sk_test_1234567890');
  const planModule = new PlanModule(httpClient);

  describe('create', () => {
    test('name is required', async () => {
      const expected = new ValidationError('name is required');
      await expect(planModule.create({} as CreatePlanArgs)).rejects.toEqual(expected);
    });

    test('amount is required', async () => {
      const expected = new ValidationError('amount is required');
      await expect(
        planModule.create({
          name: 'My first plan',
        } as CreatePlanArgs)
      ).rejects.toEqual(expected);
    });

    test('interval is required', async () => {
      const expected = new ValidationError('interval is required');
      await expect(
        planModule.create({
          name: 'My first plan',
          amount: 10000,
        } as CreatePlanArgs)
      ).rejects.toEqual(expected);
    });

    test('should create a plan', async () => {
      const plan = await planModule.create({
        name: 'My first plan',
        amount: 10000,
        interval: 'monthly',
      });
      expect(plan).toEqual(mockPlan);
    });
  });

  describe('list', () => {
    test('should list plans', async () => {
      const plans = await planModule.list({});
      expect(plans).toEqual([mockPlan]);
    });
  });

  describe('fetch', () => {
    test('should fetch a plan', async () => {
      const plan = await planModule.fetch(mockPlan.id.toString());
      expect(plan).toEqual(mockPlan);
    });
  });

  describe('update', () => {
    test('id_or_code is required', async () => {
      const expected = new ValidationError('id_or_code is required');
      await expect(planModule.update({} as UpdatePlanArgs)).rejects.toEqual(expected);
    });

    test('name is required', async () => {
      const expected = new ValidationError('name is required');
      await expect(
        planModule.update({
          id_or_code: mockPlan.id.toString(),
        } as UpdatePlanArgs)
      ).rejects.toEqual(expected);
    });

    test('amount is required', async () => {
      const expected = new ValidationError('amount is required');
      await expect(
        planModule.update({
          id_or_code: mockPlan.id.toString(),
          name: 'My updated plan',
        } as UpdatePlanArgs)
      ).rejects.toEqual(expected);
    });

    test('interval is required', async () => {
      const expected = new ValidationError('interval is required');
      await expect(
        planModule.update({
          id_or_code: mockPlan.id.toString(),
          name: 'My updated plan',
          amount: 10000,
        } as UpdatePlanArgs)
      ).rejects.toEqual(expected);
    });

    test('should update a plan', async () => {
      const response = await planModule.update({
        id_or_code: mockPlan.id.toString(),
        name: 'My updated plan',
        amount: 10000,
        interval: 'monthly',
      });
      expect(response).toEqual('Plan updated successfully');
    });
  });
});
