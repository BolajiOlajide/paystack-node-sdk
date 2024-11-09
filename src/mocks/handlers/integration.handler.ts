import { http, HttpResponse } from 'msw';

import { PAYSTACK_BASE_API_URL } from '../../constants';

import { createResponse } from './utils';

export const integrationHandlers = [
  // fetch timeout
  http.get(`${PAYSTACK_BASE_API_URL}/integration/payment_session_timeout`, () =>
    HttpResponse.json(
      createResponse(true, 'Payment session timeout fetched successfully', { payment_session_timeout: 0 })
    )
  ),

  // update timeout
  http.put(`${PAYSTACK_BASE_API_URL}/integration/payment_session_timeout`, () =>
    HttpResponse.json(
      createResponse(true, 'Payment session timeout updated successfully', { payment_session_timeout: 10 })
    )
  ),
];
