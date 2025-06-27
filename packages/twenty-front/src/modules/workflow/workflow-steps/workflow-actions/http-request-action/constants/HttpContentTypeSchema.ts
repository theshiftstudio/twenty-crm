import { httpContentTypeSchema } from '@/workflow/validation-schemas/workflowSchema';
import { z } from 'zod';

export type HttpContentType = z.infer<typeof httpContentTypeSchema>;
