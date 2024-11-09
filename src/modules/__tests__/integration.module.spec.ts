import { afterEach, describe, expect, test } from 'vitest';

import { PAYSTACK_BASE_API_URL } from '../../constants';
import { ValidationError } from '../../error/validation.error';
import { HttpClient } from '../../http';
import { server } from '../../mocks/server';
import { UpdateTimeoutArgs } from '../../schema/integration.schema';
import { IntegrationModule } from '../integration.module';

afterEach(() => {
  server.resetHandlers();
});

describe('IntegrationModule', () => {
  const httpClient = new HttpClient(PAYSTACK_BASE_API_URL, 'sk_test_1234567890');
  const integrationModule = new IntegrationModule(httpClient);

  describe('fetchTimeout', () => {
    test('should fetch payment session timeout', async () => {
      const result = await integrationModule.fetchTimeout();
      expect(result).toEqual({ payment_session_timeout: 0 });
    });
  });

  describe('updateTimeout', () => {
    test('should return validation error when timeout is not passed', async () => {
      const expected = new ValidationError('timeout is required');
      await expect(integrationModule.updateTimeout({} as UpdateTimeoutArgs)).rejects.toEqual(expected);
    });

    test('should update payment session timeout', async () => {
      const result = await integrationModule.updateTimeout({ timeout: 10 });
      expect(result).toEqual({ payment_session_timeout: 10 });
    });
  });
});
