import { argv } from 'process';

import { ps } from './paystack';

if (argv.length < 3) {
  throw new Error('incorrect usage');
}

const [_, __, command] = argv;

switch (command) {
  case 'create':
    ps.customer
      .create({ email: 'test@gmail.com' })
      .then(console.log)
      .catch((err) => console.error(err));
    break;
  case 'list':
    ps.customer.list({}).then(console.log).catch(console.error);
    break;
  case 'get':
    ps.customer.get({ email_or_code: 'CUS_xzp56gco8omykrm' }).then(console.log).catch(console.error);
    break;
  case 'update':
    ps.customer
      .update({ code: 'CUS_xzp56gco8omykrm', metadata: { newField: 'newValue' } })
      .then(console.log)
      .catch(console.error);
    break;
  case 'validate':
    ps.customer
      .validate({
        first_name: 'Bolaji',
        code: 'CUS_xzp56gco8omykrm',
        country: 'NG',
        type: 'bank_account',
        account_number: '2115689004',
        bank_code: '052',
        bvn: '00000000001',
      })
      .then(console.log)
      .catch(console.error);
    break;
  default:
    console.error('invalid command');
}
