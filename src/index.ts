import { AxiosInstance } from 'axios';

import { PAYSTACK_BASE_API_URL } from './constants';
import { createHTTPClient } from './http';
import Customer from './modules/customer.module';
import Plan from './modules/plan.module';
import { paystackSchema, type PaystackArgs } from './schema/paystack.schema';

class Paystack {
  private secretKey: string;
  private baseUrl: string;
  private httpClient: AxiosInstance;

  public plan: Plan;
  public customer: Customer;

  constructor(opts: PaystackArgs) {
    paystackSchema.parse(opts);

    this.secretKey = opts.secretKey;
    this.baseUrl = opts.baseUrl || PAYSTACK_BASE_API_URL;
    this.httpClient = createHTTPClient(this.baseUrl, this.secretKey);

    // register modules
    this.plan = new Plan(this.httpClient);
    this.customer = new Customer(this.httpClient);
  }
}

export default Paystack;
