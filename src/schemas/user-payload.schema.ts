import z from 'zod';

export const userPayloadSchema = z.object({
  sub: z.uuid(),
});

export type UserPayload = z.infer<typeof userPayloadSchema>;
