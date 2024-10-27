import { config } from 'dotenv';

import { Paystack } from '../src';

config();

export const ps = new Paystack({ secretKey: process.env.PAYSTACK_API_KEY as string });
