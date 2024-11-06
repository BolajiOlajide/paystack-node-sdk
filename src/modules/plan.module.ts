import { z } from 'zod';

import { handleModuleError } from '../error';
import type { HttpClient } from '../http';
import {
  createPlanArgsSchema,
  type CreatePlanArgs,
  type Plan,
  type ListPlanArgs,
  listPlanArgsSchema,
  type UpdatePlanArgs,
  updatePlanArgsSchema,
} from '../schema/plan.schema';
import { createQueryForURL } from '../utils/query.util';

import { Base } from './base.module';

const idOrCodeSchema = z.string();

/**
 * The Plan API are endpoints that can be used to manage plans.
 *
 * https://paystack.com/docs/api/plan/
 */
export class PlanModule extends Base {
  private endpoint: string = '/plan';

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  async create(args: CreatePlanArgs): Promise<Plan> {
    try {
      createPlanArgsSchema.parse(args);
      const result = await this._post<Plan, CreatePlanArgs>(this.endpoint, args);
      if (result.status) {
        return result.data;
      }
      return Promise.reject(new Error(result.message));
    } catch (err) {
      return handleModuleError(err);
    }
  }

  async list(args: ListPlanArgs): Promise<Plan[]> {
    try {
      listPlanArgsSchema.parse(args);
      const url = createQueryForURL(this.endpoint, args || {});
      const result = await this._get<Plan[]>(url);
      if (result.status) {
        return result.data;
      }
      return Promise.reject(new Error(result.message));
    } catch (err) {
      return handleModuleError(err);
    }
  }

  async fetch(idOrCode: string): Promise<Plan> {
    try {
      idOrCodeSchema.parse(idOrCode);
      const result = await this._get<Plan>(`${this.endpoint}/${idOrCode}`);
      if (result.status) {
        return result.data;
      }
      return Promise.reject(new Error(result.message));
    } catch (err) {
      return handleModuleError(err);
    }
  }

  async update(args: UpdatePlanArgs): Promise<Plan> {
    try {
      updatePlanArgsSchema.parse(args);
      const { id_or_code, ...rest } = args;
      const result = await this._put<Plan, Omit<UpdatePlanArgs, 'id_or_code'>>(`${this.endpoint}/${id_or_code}`, rest);
      if (result.status) {
        return result.data;
      }
      return Promise.reject(new Error(result.message));
    } catch (err) {
      return handleModuleError(err);
    }
  }
}
