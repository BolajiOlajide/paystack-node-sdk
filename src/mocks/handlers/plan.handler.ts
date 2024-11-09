import { http, HttpResponse } from 'msw';

import { PAYSTACK_BASE_API_URL } from '../../constants';
import { mockPlan } from '../../fixtures/plan.fixture';

import { createResponse } from './utils';

export const planHandlers = [
  // create plan
  http.post(`${PAYSTACK_BASE_API_URL}/plan`, () =>
    HttpResponse.json(createResponse(true, 'Plan created successfully', mockPlan))
  ),

  // list plans
  http.get(`${PAYSTACK_BASE_API_URL}/plan`, () =>
    HttpResponse.json(createResponse(true, 'Plan list fetched successfully', [mockPlan]))
  ),

  // fetch plan
  http.get(`${PAYSTACK_BASE_API_URL}/plan/:id`, () =>
    HttpResponse.json(createResponse(true, 'Plan fetched successfully', mockPlan))
  ),

  // update plan
  http.put(`${PAYSTACK_BASE_API_URL}/plan/:id`, () =>
    HttpResponse.json(createResponse(true, 'Plan updated successfully', null))
  ),
];
