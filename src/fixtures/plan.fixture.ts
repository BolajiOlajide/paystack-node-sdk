import type { Plan } from '../schema/plan.schema';

export const mockPlan: Plan = {
  name: 'test Plan',
  interval: 'monthly',
  amount: 500000,
  invoice_limit: 2,
  integration: 134537,
  domain: 'test',
  currency: 'NGN',
  plan_code: 'PLN_w2i8dxc7rorz954',
  send_invoices: true,
  send_sms: true,
  hosted_page: false,
  migrate: false,
  is_archived: false,
  id: 913046,
  createdAt: '2023-09-16T06:12:49.410Z',
  updatedAt: '2023-09-16T06:12:49.410Z',
};
