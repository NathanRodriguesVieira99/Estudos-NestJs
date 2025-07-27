import { z } from 'zod';

export const authenticateBodySchema = z.object({
    email: z.email(),
    password: z.string(),
});

export type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>;
