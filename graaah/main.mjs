import { Paystack } from 'paystack-node';

const paystack = new Paystack({
  secretKey: 'sk_test_3625f7fbb5408d5b9ee837aff632e1cca025c0e8',
});

(async () => {
  try {
    // const customer = await paystack.customer.create({
    //   email: 'test@test2.com',
    //   first_name: 'Test',
    //   last_name: 'User',
    // });

    // const customers = await paystack.customer.list({
    //   per_page: 10,
    //   page: 1,
    // });
    // console.log(customers);

    const customer = await paystack.customer.get({
      email_or_code: 'test_CUS_abj843xvrcwpk6v',
    });
    console.log(customer, 'customer .....');
  } catch (err) {
    console.error(err);
  }
})();
