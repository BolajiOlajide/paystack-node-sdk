import type { Meta } from '../../schema/base.schema';

export const createResponse = <T>(
  status: boolean,
  message: string,
  data: T
): { status: true; message: string; data: T; meta?: Meta } | { status: false; message: string; data?: never } => {
  if (status) {
    if (Array.isArray(data)) {
      return { status, message, data, meta: { total: data.length, skipped: 0, perPage: 50, page: 1, pageCount: 1 } };
    }
    return { status, message, data };
  }

  return { status, message };
};
