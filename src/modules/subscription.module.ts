import { AxiosInstance, AxiosResponse } from 'axios';

import { CREATE_PLAN_ENDPOINT } from '../constants';
import { handleError } from '../error';
import {
  type CreatePlanArgs,
  createPlanArgsSchema,
  type CreatePlanResponse,
  type Plan,
} from '../schema/subscription.schema';
import { isNonErrorResponse } from '../utils/status.util';

/**
 * The Subscriptions API lets developers embed recurring billing functionality in their applications,
 * without having to manage the billing cycle themselves. Merchants can easily create plans and
 * charge customers automatically, on a recurring basis.
 *
 * https://paystack.com/docs/payments/subscriptions/
 */
class SubscriptionModule {
  private httpClient: AxiosInstance;

  constructor(httpClient: AxiosInstance) {
    this.httpClient = httpClient;
  }

  /**
   * Plans are the foundational building block for subscriptions.
   * A plan represents what you're selling, how much you're selling it for,
   * and how often you're charging for it.
   *
   * @param {CreatePlanArgs} args
   * @returns {Plan} Plan object representing the newly created plan.
   */
  async createPlan(args: CreatePlanArgs): Promise<Plan> {
    try {
      createPlanArgsSchema.parse(args);

      const { data, status } = await this.httpClient.post<
        CreatePlanResponse,
        AxiosResponse<CreatePlanResponse>,
        CreatePlanArgs
      >(CREATE_PLAN_ENDPOINT, args);

      if (data.status && isNonErrorResponse(status)) {
        return data.data;
      }

      return Promise.reject({ message: data.message });
    } catch (err) {
      return handleError(err);
    }
  }
}

export default SubscriptionModule;
