import type { Meta } from './schema/base.schema';

export type HTTPResponse<T> = Promise<
  | {
      data: T;
      status: true;
      message: string;
      meta?: Meta;
    }
  | {
      status: false;
      message: string;
      meta: {
        nextStep: string;
      };
      type: string;
      code: string;
    }
>;
