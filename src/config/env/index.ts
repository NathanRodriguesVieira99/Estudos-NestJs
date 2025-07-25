import z from 'zod';

export const envSchema = z.object({
  DATABASE_URL: z.url().startsWith('postgresql://'),
  PORT: z.coerce.number().optional().default(3333),
  JWT_PRIVATE_KEY: z.string(),
  JWT_PUBLIC_KEY: z.string(),
  CORS_ORIGIN: z.string(),
});

export type Env = z.infer<typeof envSchema>;
