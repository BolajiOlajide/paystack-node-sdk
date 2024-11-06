import { Paystack } from 'paystack-node';

const paystack = new Paystack({
  secretKey: 'sk_test_3625f7fbb5408d5b9ee837aff632e1cca025c0e8',
});

(async () => {
  try {
    // const countries = await paystack.misc.listCountries();
    // console.log(countries);

    // const states = await paystack.misc.listStates({
    //   country: 'CA',
    // });
    // console.log(states);

    const banks = await paystack.misc.listBanks({
      country: 'nigeria',
    });
    console.log(banks);
  } catch (err) {
    console.error(err);
  }
})();
