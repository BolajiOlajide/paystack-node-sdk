import { z } from 'zod';

export const integrationSchema = z.object({
  payment_session_timeout: z.number().positive(),
});

export type Integration = z.infer<typeof integrationSchema>;

export const updateTimeoutArgsSchema = z.object({
  timeout: z
    .number({
      required_error: 'timeout is required',
      invalid_type_error: 'timeout must be a number',
      description: 'The timeout for the payment session',
    })
    .positive({
      message: 'timeout must be a positive number',
    }),
});

export type UpdateTimeoutArgs = z.infer<typeof updateTimeoutArgsSchema>;
