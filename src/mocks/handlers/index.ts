import { customerHandlers } from './customer.handler';
import { miscHandlers } from './misc.handler';
import { planHandlers } from './plan.handler';

export const handlers = [...customerHandlers, ...miscHandlers, ...planHandlers];
