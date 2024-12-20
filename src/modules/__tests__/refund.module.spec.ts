import { test, expect, afterEach, describe } from 'vitest';

import { PAYSTACK_BASE_API_URL } from '../../constants';
import { ValidationError } from '../../error/validation.error';
import { mockPlan } from '../../fixtures/plan.fixture';
import { mockRefunds, newRefund } from '../../fixtures/refund.fixture';
import { HttpClient } from '../../http';
import { server } from '../../mocks/server';
import { CreatePlanArgs, UpdatePlanArgs } from '../../schema/plan.schema';
import { CreateRefundArgs, FetchRefundArgs } from '../../schema/refund.schema';
import { RefundModule } from '../refund.module';

afterEach(() => {
  server.resetHandlers();
});

describe('RefundModule', () => {
  const httpClient = new HttpClient(PAYSTACK_BASE_API_URL, 'sk_test_1234567890');
  const refundModule = new RefundModule(httpClient);

  describe('create', () => {
    test('should return validation error when transaction is not passed', async () => {
      const expected = new ValidationError('transaction is required');
      await expect(refundModule.create({} as CreateRefundArgs)).rejects.toEqual(expected);
    });

    test('should create a refund', async () => {
      const refund = await refundModule.create({
        transaction: 'tx_00000000000000000000000000000000',
      });
      expect(refund).toEqual(newRefund);
    });
  });

  describe('fetch', () => {
    test('should return validation error when id is not passed', async () => {
      const expected = new ValidationError('id is required');
      await expect(refundModule.fetch({} as FetchRefundArgs)).rejects.toEqual(expected);
    });

    test('should fetch a refund', async () => {
      const refund = await refundModule.fetch({ id: 're_00000000000000000000000000000000' });
      expect(refund).toEqual(mockRefunds[0]);
    });
  });

  describe('list', () => {
    test('should list refunds', async () => {
      const response = await refundModule.list();
      expect(response.data).toEqual(mockRefunds);
      expect(response.meta).toEqual({
        total: 2,
        skipped: 0,
        perPage: 50,
        page: 1,
        pageCount: 1,
      });
    });
  });
});
