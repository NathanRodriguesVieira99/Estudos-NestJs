import z from 'zod';

export const envSchema = z.object({
	DATABASE_URL: z.url().startsWith('postgresql://'),
	PORT: z.coerce.number().optional().default(3333),
	NODE_ENV: z.string(),
	JWT_PRIVATE_KEY: z.string(),
	JWT_PUBLIC_KEY: z.string(),
	CORS_ORIGIN: z.url().startsWith('http://localhost:'),
});

export type Env = z.infer<typeof envSchema>;
