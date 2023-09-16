import { AxiosInstance, AxiosResponse } from 'axios';
import { CREATE_PLAN_ENDPOINT } from '../endpoints';
import { type CreatePlanArgs, createPlanArgsSchema, type CreatePlanResponse } from '../schema/plan.schema';

class Plan {
  private httpClient: AxiosInstance;

  constructor(httpClient: AxiosInstance) {
    this.httpClient = httpClient;
  }

  async createPlan(args: CreatePlanArgs): Promise<CreatePlanResponse> {
    console.log(args);
    createPlanArgsSchema.parse(args);

    const result = await this.httpClient.post<CreatePlanResponse, AxiosResponse<CreatePlanResponse>, CreatePlanArgs>(
      CREATE_PLAN_ENDPOINT,
      args
    );
    // error handling
    return result.data;
  }
}
