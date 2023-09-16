import { AxiosInstance } from 'axios';

import { createHTTPClient } from './http';
import { paystackSchema, type PaystackArgs } from './schema/paystack.schema';

// modules
import Plan from './modules/plan.module';

class Paystack {
  private secretKey: string;
  private baseUrl: string;
  private httpClient: AxiosInstance;

  public plan: Plan;

  constructor(opts: PaystackArgs) {
    paystackSchema.parse(opts);

    this.secretKey = opts.secretKey;
    this.baseUrl = opts.baseUrl && opts.baseUrl !== '' ? opts.baseUrl : 'https://api.paystack.co';
    this.httpClient = createHTTPClient(this.baseUrl, this.secretKey);

    // register modules
    this.plan = new Plan(this.httpClient);
  }
}

export default Paystack;
