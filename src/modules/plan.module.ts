import { AxiosInstance, AxiosResponse } from 'axios';

import { CREATE_PLAN_ENDPOINT } from '../endpoints';
import {
  type CreatePlanArgs,
  createPlanArgsSchema,
  type CreatePlanResponse,
  type Plan as SubscriptionPlan,
} from '../schema/plan.schema';
import { isNonErrorResponse } from '../utils/status.util';

class Plan {
  private httpClient: AxiosInstance;

  constructor(httpClient: AxiosInstance) {
    this.httpClient = httpClient;
  }

  async createPlan(args: CreatePlanArgs): Promise<SubscriptionPlan> {
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
      const errMsg = typeof err === 'string' ? err : (err as Error).message;
      return Promise.reject({ message: errMsg || 'an unknown error occurred' });
    }
  }
}

export default Plan;
