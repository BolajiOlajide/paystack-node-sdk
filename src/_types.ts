export type HTTPResponse<T> = Promise<
  | {
      data: T;
      status: true;
      message: string;
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
