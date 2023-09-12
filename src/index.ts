import { paystackSchema } from './schema/paystack';

interface PaystackArgs {
  apiKey: string;

  // You can set your payment URL here if you're using a proxy
  // for paystack. The default is https://api.paystack.co
  baseUrl?: string;
}

class Paystack {
  private apiKey: string;
  private baseUrl: string;

  constructor(opts: PaystackArgs) {
    paystackSchema.parse(opts);

    this.apiKey = opts.apiKey;
    this.baseUrl = (opts.baseUrl && opts.baseUrl !== '') ? opts.baseUrl : 'https://api.paystack.co';
  }
}

export default Paystack;
