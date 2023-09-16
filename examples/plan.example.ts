import dotenv from 'dotenv';

import Paystack from '../src';

dotenv.config();

const ps = new Paystack({ secretKey: process.env.PAYSTACK_API_KEY as string });

ps.plan
  .createPlan({ name: 'Plan Name', amount: 10000, interval: 'monthly' })
  .then(console.log)
  .catch((err) => console.error(err.message));
