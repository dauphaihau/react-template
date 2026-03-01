import { z } from 'zod';

const envSchema = z.object({
  VITE_API_URL: z.url('VITE_API_URL must be a valid URL'),
  VITE_LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error', 'none']).optional(),
});

function parseEnv() {
  const result = envSchema.safeParse(import.meta.env);
  if (!result.success) {
    const issues = result.error.issues
      .map((i) => `  ${i.path.join('.')}: ${i.message}`)
      .join('\n');
    throw new Error(`Invalid environment variables:\n${issues}`);
  }
  return result.data;
}

export const env = parseEnv();
