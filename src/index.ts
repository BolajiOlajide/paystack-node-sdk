import { AxiosInstance } from 'axios';

import { createHTTPClient } from './http';
import { paystackSchema, type PaystackArgs } from './schema/paystack.schema';

class Paystack {
  private secretKey: string;
  private baseUrl: string;
  private httpClient: AxiosInstance;

  // public subscriptions:

  constructor(opts: PaystackArgs) {
    paystackSchema.parse(opts);

    this.secretKey = opts.secretKey;
    this.baseUrl = opts.baseUrl && opts.baseUrl !== '' ? opts.baseUrl : 'https://api.paystack.co';
    this.httpClient = createHTTPClient(this.baseUrl, this.secretKey);
    this.registerModules();
  }

  registerModules() {
    // this.su
  }
}

export default Paystack;
