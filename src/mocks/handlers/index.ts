import { customerHandlers } from './customer.handler';
import { integrationHandlers } from './integration.handler';
import { miscHandlers } from './misc.handler';
import { planHandlers } from './plan.handler';
import { refundHandlers } from './refund.handler';

export const handlers = [...customerHandlers, ...miscHandlers, ...planHandlers, ...refundHandlers, ...integrationHandlers];
