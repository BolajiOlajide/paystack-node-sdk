import type { Bank } from '../schema/bank.schema';

export const mockBanks = [
  {
    id: 302,
    name: '9mobile 9Payment Service Bank',
    slug: '9mobile-9payment-service-bank-ng',
    code: '120001',
    longcode: '120001',
    gateway: '',
    pay_with_bank: false,
    active: true,
    country: 'Nigeria',
    currency: 'NGN',
    type: 'nuban',
    is_deleted: false,
    createdAt: '2022-05-31T06:50:27.000Z',
    updatedAt: '2022-06-23T09:33:55.000Z',
  },
  {
    id: 174,
    name: 'Abbey Mortgage Bank',
    slug: 'abbey-mortgage-bank-ng',
    code: '404',
    longcode: '',
    gateway: null,
    pay_with_bank: false,
    active: true,
    country: 'Nigeria',
    currency: 'NGN',
    type: 'nuban',
    is_deleted: false,
    createdAt: '2020-12-07T16:19:09.000Z',
    updatedAt: '2023-09-14T13:02:38.000Z',
  },
];
