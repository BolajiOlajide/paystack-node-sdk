import { PAYSTACK_BASE_API_URL } from './constants';
import { HttpClient } from './http';
import { CustomerModule } from './modules/customer.module';
import { MiscellaneousModule } from './modules/misc.module';
// import { PlanModule } from './modules/plan.module';
import { paystackSchema, type PaystackArgs } from './schema/base.schema';

export class Paystack {
  private secretKey: string;
  private baseUrl: string;
  private httpClient: HttpClient;

  // public plan: PlanModule;
  public customer: CustomerModule;
  public misc: MiscellaneousModule;

  constructor(opts: PaystackArgs) {
    paystackSchema.parse(opts);

    this.secretKey = opts.secretKey;
    this.baseUrl = opts.baseUrl || PAYSTACK_BASE_API_URL;
    this.httpClient = new HttpClient(this.baseUrl, this.secretKey);

    // register modules
    // this.plan = new PlanModule(this.httpClient);
    this.customer = new CustomerModule(this.httpClient);
    this.misc = new MiscellaneousModule(this.httpClient);
  }
}
