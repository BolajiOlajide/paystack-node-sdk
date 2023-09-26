import { AxiosInstance } from 'axios';

import { PAYSTACK_BASE_API_URL } from './constants';
import { createHTTPClient } from './http';
import Customer from './modules/customer.module';
import Misc from './modules/misc.module';
import Plan from './modules/plan.module';
import { paystackSchema, type PaystackArgs } from './schema/base.schema';

class Paystack {
  private secretKey: string;
  private baseUrl: string;
  private httpClient: AxiosInstance;

  public plan: Plan;
  public customer: Customer;
  public misc: Misc;

  constructor(opts: PaystackArgs) {
    paystackSchema.parse(opts);

    this.secretKey = opts.secretKey;
    this.baseUrl = opts.baseUrl || PAYSTACK_BASE_API_URL;
    this.httpClient = createHTTPClient(this.baseUrl, this.secretKey);

    // register modules
    this.plan = new Plan(this.httpClient);
    this.customer = new Customer(this.httpClient);
    this.misc = new Misc(this.httpClient);
  }
}

export default Paystack;
