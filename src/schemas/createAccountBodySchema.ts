import { z } from 'zod';

export const createAccountBodySchema = z.object({
	name: z.string(),
	email: z.email(),
	password: z.string(),
});

export type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>;
