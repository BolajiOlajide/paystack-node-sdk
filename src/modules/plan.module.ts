import { AxiosInstance, AxiosResponse } from 'axios';

import { type CreatePlanArgs, createPlanArgsSchema, type CreatePlanResponse, type Plan } from '../schema/plan.schema';

import Base from './base.module';

class PlanModule extends Base {
  private endpoint: string = '/plan';

  constructor(httpClient: AxiosInstance) {
    super(httpClient);
  }

  /**
   * Plans are the foundational building block for subscriptions.
   * A plan represents what you're selling, how much you're selling it for,
   * and how often you're charging for it.
   *
   * @param {CreatePlanArgs} args
   * @returns {Plan} Plan object representing the newly created plan.
   */
  create(args: CreatePlanArgs): Promise<Plan> {
    return this.wrap(() => {
      createPlanArgsSchema.parse(args);
      return this.httpClient.post<CreatePlanResponse, AxiosResponse<CreatePlanResponse>, CreatePlanArgs>(
        this.endpoint,
        args
      );
    });
  }
}

export default PlanModule;
