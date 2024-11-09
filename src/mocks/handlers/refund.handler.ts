import { http, HttpResponse } from 'msw';

import { PAYSTACK_BASE_API_URL } from '../../constants';
import { mockRefunds, newRefund } from '../../fixtures/refund.fixture';

import { createResponse } from './utils';

const [firstMockRefund] = mockRefunds;

export const refundHandlers = [
  // create refund
  http.post(`${PAYSTACK_BASE_API_URL}/refund`, () =>
    HttpResponse.json(createResponse(true, 'Refund created successfully', newRefund))
  ),

  // fetch refund
  http.get(`${PAYSTACK_BASE_API_URL}/refund/:id`, () =>
    HttpResponse.json(createResponse(true, 'Refund fetched successfully', firstMockRefund))
  ),

  // list refunds
  http.get(`${PAYSTACK_BASE_API_URL}/refund`, () =>
    HttpResponse.json(createResponse(true, 'Refund list fetched successfully', mockRefunds))
  ),
];
