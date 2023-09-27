import { argv } from 'process';

import { ps } from './paystack';

if (argv.length < 3) {
  throw new Error('incorrect usage');
}

const [_, __, command] = argv;

switch (command) {
  case 'listCountries':
    ps.misc.listCountries().then(console.log).catch(console.error);
    break;
  case 'listStates':
    ps.misc.listStates({ country: 'US' }).then(console.log).catch(console.error);
    break;
  default:
    console.error('invalid command');
}
