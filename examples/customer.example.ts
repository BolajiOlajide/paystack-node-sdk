import { ps } from './paystack';

// This will create a new plan for subscriptions.
// If there's an error it'll log the error message to the console.
ps.customer
  .create({ email: 'test@gmail.com' })
  .then(console.log)
  .catch((err) => console.error(err));
