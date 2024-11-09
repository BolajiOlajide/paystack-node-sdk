import { http, HttpResponse } from 'msw';

import { PAYSTACK_BASE_API_URL } from '../../constants';
import { mockBanks } from '../../fixtures/bank.fixture';
import { mockCountries, mockStates } from '../../fixtures/country.fixture';

import { createResponse } from './utils';

export const miscHandlers = [
  // list countries
  http.get(`${PAYSTACK_BASE_API_URL}/country`, () =>
    HttpResponse.json(createResponse(true, 'Country list fetched successfully', mockCountries))
  ),

  // list states
  http.get(`${PAYSTACK_BASE_API_URL}/address_verification/states`, () =>
    HttpResponse.json(createResponse(true, 'State list fetched successfully', mockStates))
  ),

  // list banks
  http.get(`${PAYSTACK_BASE_API_URL}/bank`, () =>
    HttpResponse.json(createResponse(true, 'Bank list fetched successfully', mockBanks))
  ),
];
