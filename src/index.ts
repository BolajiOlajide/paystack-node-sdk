import { AxiosInstance } from 'axios';

import { createHTTPClient } from './http';
import { paystackSchema, type PaystackArgs } from './schema/paystack.schema';

// modules
import Subscription from './modules/subscription.module';

class Paystack {
  private secretKey: string;
  private baseUrl: string;
  private httpClient: AxiosInstance;

  public subscription: Subscription;

  constructor(opts: PaystackArgs) {
    paystackSchema.parse(opts);

    this.secretKey = opts.secretKey;
    this.baseUrl = opts.baseUrl && opts.baseUrl !== '' ? opts.baseUrl : 'https://api.paystack.co';
    this.httpClient = createHTTPClient(this.baseUrl, this.secretKey);

    // register modules
    this.subscription = new Subscription(this.httpClient);
  }
}

export default Paystack;
