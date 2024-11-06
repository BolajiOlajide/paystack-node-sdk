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

    // const customer = await paystack.customer.get({
    //   email_or_code: 'CUS_abj843xvrcwpk6v',
    // });

    // const customer = await paystack.customer.update({
    //   code: 'CUS_9gue4r20plwfqhy',
    //   first_name: 'John',
    //   last_name: 'Doe',
    // });
    // console.log(customer, 'customer .....');

    // const validationMsg = await paystack.customer.validate({
    //   code: 'CUS_9gue4r20plwfqhy',
    //   first_name: 'John',
    //   last_name: 'Doe',
    //   country: 'NG',
    //   type: 'bank_account',
    //   account_number: '0123456789',
    //   bank_code: '012',
    //   bvn: '20012345677'
    // });
    // console.log(validationMsg);

    // const customer = await paystack.customer.whitelistOrBlacklist({
    //   customer: 'CUS_b4e5m4dk53c6y3y',
    //   risk_action: 'allow',
    // });
    // console.log(customer);

    const resp = await paystack.customer.deactivateAuthorization({
      authorization_code: 'AUTH_b4e5m4dk53c6y3y',
    });
    console.log(resp);
  } catch (err) {
    console.error(err);
  }
})();
