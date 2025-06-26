import { z } from 'zod';

export const httpContentTypeSchema = z.enum([
  'application/json',
  'multipart/form-data',
  'application/x-www-form-urlencoded',
  'text/plain',
]);

export type HttpContentType = z.infer<typeof httpContentTypeSchema>;
