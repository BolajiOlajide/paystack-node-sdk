import { AxiosInstance, AxiosResponse } from 'axios';

import { CREATE_PLAN_ENDPOINT } from '../constants';
import { handleError } from '../error';
import { type CreatePlanArgs, createPlanArgsSchema, type CreatePlanResponse, type Plan } from '../schema/plan.schema';
import { isNonErrorResponse } from '../utils/status.util';

class PlanModule {
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
  async create(args: CreatePlanArgs): Promise<Plan> {
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

export default PlanModule;
