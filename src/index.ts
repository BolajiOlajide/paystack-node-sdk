import { AxiosInstance } from 'axios';

import { PAYSTACK_BASE_API_URL } from './constants';
import { createHTTPClient } from './http';
import Subscription from './modules/subscription.module';
import { paystackSchema, type PaystackArgs } from './schema/paystack.schema';

class Paystack {
  private secretKey: string;
  private baseUrl: string;
  private httpClient: AxiosInstance;

  public subscription: Subscription;

  constructor(opts: PaystackArgs) {
    paystackSchema.parse(opts);

    this.secretKey = opts.secretKey;
    this.baseUrl = opts.baseUrl || PAYSTACK_BASE_API_URL;
    this.httpClient = createHTTPClient(this.baseUrl, this.secretKey);

    // register modules
    this.subscription = new Subscription(this.httpClient);
  }
}

export default Paystack;
