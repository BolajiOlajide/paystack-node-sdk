import { Paystack } from 'paystack-node';

const paystack = new Paystack({
  secretKey: 'sk_test_3625f7fbb5408d5b9ee837aff632e1cca025c0e8',
});

(async () => {
  try {
    // create a transaction with the initialize transaction endpoint
    // and copy the reference. Make sure the transaction is settled before initiating a refund
    // https://api.paystack.co/transaction/initialize
    // const refund = await paystack.refund.create({
    //   transaction: 't3t3ae8jhr',
    // });
    // console.log(refund);

    // const refund = await paystack.refund.fetch({ id: '13194992' });
    // console.log(refund);

    const refunds = await paystack.refund.list({});
    console.log(refunds);
  } catch (err) {
    console.error(err);
  }
})();
