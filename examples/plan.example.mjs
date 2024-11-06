import { Paystack } from 'paystack-node';

const paystack = new Paystack({
  secretKey: 'sk_test_3625f7fbb5408d5b9ee837aff632e1cca025c0e8',
});

(async () => {
  try {
    // const plans = await paystack.plan.list();
    // console.log(plans);

    // const plan = await paystack.plan.create({
    //   name: 'Test Plan',
    //   amount: 10000,
    //   interval: 'monthly',
    // });
    // console.log(plan);

    const plan = await paystack.plan.fetch('PLN_swd8ug28lzcz0ar');
    console.log(plan);
  } catch (err) {
    console.error(err);
  }
})();
