import { customerHandlers } from './customer.handler';
import { miscHandlers } from './misc.handler';

export const handlers = [...customerHandlers, ...miscHandlers];
