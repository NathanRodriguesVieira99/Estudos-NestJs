import z from 'zod';

export const tokenPayloadSchema = z.object({
    sub: z.uuid(),
});

export type UserPayload = z.infer<typeof tokenPayloadSchema>;
