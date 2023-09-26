import type { Customer } from '../schema/customer.schema';

export const newMockCustomer: Customer = {
  transactions: [],
  subscriptions: [],
  authorizations: [],
  first_name: 'Bolaji',
  last_name: 'Proton',
  email: 'bolaji2@test.com',
  phone: null,
  metadata: {
    newField: 'newValue',
  },
  domain: 'test',
  customer_code: 'CUS_abc1234gmykrm',
  risk_action: 'default',
  id: 139028242,
  integration: 134537,
  createdAt: '2023-09-16T15:51:27.000Z',
  updatedAt: '2023-09-23T12:04:53.000Z',
  identified: true,
  identifications: [
    {
      country: 'NG',
      type: 'bank_account',
      value: '211****004',
    },
  ],
};
