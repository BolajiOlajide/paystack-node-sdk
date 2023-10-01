import type { Country, State } from '../schema/country.schema';

export const mockCountry = {
  id: 1,
  active_for_dashboard_onboarding: true,
  name: 'Nigeria',
  iso_code: 'NG',
  default_currency_code: 'NGN',
  integration_defaults: {},
  calling_code: '+234',
  pilot_mode: false,
  relationships: {
    currency: {
      type: 'currency',
      data: ['NGN'],
      supported_currencies: {
        NGN: {
          bank: {
            bank_type: 'nuban',
            branch_code: false,
            branch_code_type: 'text',
            account_name: false,
            account_verification_required: true,
            account_number_label: 'accountNumber',
            account_number_pattern: {
              exact_match: true,
              pattern: '[0-9]{10}',
            },
            documents: [],
            show_account_number_tooltip: false,
          },
        },
        USD: {
          bank: {
            bank_type: 'nuban',
            required_fields: ['bank', 'account_number'],
            branch_code: false,
            branch_code_type: 'text',
            account_name: false,
            account_verification_required: true,
            account_number_label: 'accountNumber',
            account_number_pattern: {
              exact_match: true,
              pattern: '',
            },
            documents: [],
            notices: [
              'USD can currently only be settled into Zenith Bank USD accounts.',
              "You'll receive USD settlements 7 working days after payment has been made.",
              'In case of fraudulent transactions involving international payments, Paystack will reverse the transaction and deduct the amount from your balance.',
            ],
          },
        },
      },
    },
    integration_feature: {
      type: 'integration_feature',
      data: [],
    },
    integration_type: {
      type: 'integration_type',
      data: ['ITYPE_001', 'ITYPE_002', 'ITYPE_003'],
    },
    payment_method: {
      type: 'payment_method',
      data: ['PAYM_001', 'PAYM_002', 'PAYM_003', 'PAYM_004'],
    },
  },
};

export const mockCountries: Country[] = [
  mockCountry,
  {
    id: 2,
    active_for_dashboard_onboarding: true,
    name: 'Ghana',
    iso_code: 'GH',
    default_currency_code: 'GHS',
    integration_defaults: {},
    calling_code: '+233',
    pilot_mode: false,
    relationships: {
      currency: {
        type: 'currency',
        data: ['GHS'],
        supported_currencies: {
          GHS: {
            bank: {
              bank_type: 'ghipss',
              account_verification_required: true,
              account_number_label: 'accountNumber',
              branch_code: true,
              branch_code_type: 'dropdown',
              account_name: false,
              account_number_pattern: {
                exact_match: true,
                pattern: '[0-9]{7,16}',
              },
              documents: [],
              show_account_number_tooltip: false,
            },
            mobile_money: {
              bank_type: 'mobile_money',
              phone_number_label: 'phoneNumber',
              placeholder: '050 123 456',
              account_number_pattern: {
                exact_match: false,
                pattern: '^[0-9]{10}$',
              },
            },
          },
        },
      },
      integration_feature: {
        type: 'integration_feature',
        data: [],
      },
      integration_type: {
        type: 'integration_type',
        data: ['ITYPE_004', 'ITYPE_005'],
      },
      payment_method: {
        type: 'payment_method',
        data: ['PAYM_001'],
      },
    },
  },
  {
    id: 3,
    active_for_dashboard_onboarding: true,
    name: 'South Africa',
    iso_code: 'ZA',
    default_currency_code: 'ZAR',
    calling_code: '+27',
    integration_defaults: {},
    pilot_mode: false,
    relationships: {
      currency: {
        type: 'currency',
        data: ['ZAR'],
        supported_currencies: {
          ZAR: {
            bank: {
              bank_type: 'basa',
              account_verification_required: true,
              account_number_label: 'accountNumber',
              branch_code: false,
              branch_code_type: 'text',
              account_name: true,
              account_number_pattern: {
                exact_match: false,
                pattern: '[0-9]{9,11}',
              },
              documents: ['ZA-BANK'],
              show_account_number_tooltip: false,
            },
            eft: {
              account_number_pattern: {
                exact_match: false,
                pattern: '^[0-9]{10}$',
              },
              placeholder: '050 123 456',
            },
          },
        },
      },
      integration_feature: {
        type: 'integration_feature',
        data: [],
      },
      integration_type: {
        type: 'integration_type',
        data: ['ITYPE_006', 'ITYPE_007'],
      },
      payment_method: {
        type: 'payment_method',
        data: ['PAYM_001'],
      },
    },
  },
];

export const mockStates: State[] = [
  {
    name: 'Alaska',
    slug: 'alaska',
    abbreviation: 'AK',
  },
  {
    name: 'Alabama',
    slug: 'alabama',
    abbreviation: 'AL',
  },
  {
    name: 'Arkansas',
    slug: 'arkansas',
    abbreviation: 'AR',
  },
];
