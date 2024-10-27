import { ps } from './paystack';

// This will create a new plan for subscriptions.
// If there's an error, it'll log the error message to the console.
ps.plan
  .create({ name: 'Plan Name', amount: 10000, interval: 'monthly' })
  .then(console.log)
  .catch((err) => console.error(err));
