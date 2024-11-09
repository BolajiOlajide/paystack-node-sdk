import { http, HttpResponse } from 'msw';

import { PAYSTACK_BASE_API_URL } from '../../constants';
import { mockCustomers, newMockCustomer } from '../../fixtures/customer.fixture';

import { createResponse } from './utils';

export const customerHandlers = [
  // create a customer
  http.post(`${PAYSTACK_BASE_API_URL}/customer`, () =>
    HttpResponse.json(createResponse(true, 'Customer created successfully', newMockCustomer))
  ),

  // fetch list of customers
  http.get(`${PAYSTACK_BASE_API_URL}/customer`, () =>
    HttpResponse.json(createResponse(true, 'Customer list fetched successfully', mockCustomers))
  ),

  // fetch a customer
  http.get(`${PAYSTACK_BASE_API_URL}/customer/:email_or_code`, () =>
    HttpResponse.json(createResponse(true, 'Customer fetched successfully', newMockCustomer))
  ),

  // update a customer
  http.put(`${PAYSTACK_BASE_API_URL}/customer/:code`, () =>
    HttpResponse.json(createResponse(true, 'Customer updated successfully', newMockCustomer))
  ),

  // validate a customer
  http.post(`${PAYSTACK_BASE_API_URL}/customer/:code/identification`, () =>
    HttpResponse.json(createResponse(true, 'Customer validated successfully', 'valid'))
  ),

  // whitelist or blacklist a customer
  http.post(`${PAYSTACK_BASE_API_URL}/customer/set_risk_action`, () =>
    HttpResponse.json(createResponse(true, 'Customer whitelisted successfully', newMockCustomer))
  ),

  // deactivate an authorization
  http.post(`${PAYSTACK_BASE_API_URL}/customer/deactivate_authorization`, () =>
    HttpResponse.json(createResponse(true, 'Authorization deactivated successfully', null))
  ),
];
