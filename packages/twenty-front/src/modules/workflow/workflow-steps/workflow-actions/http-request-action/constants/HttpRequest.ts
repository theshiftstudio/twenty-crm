import { workflowHttpRequestActionSettingsSchema } from '@/workflow/validation-schemas/workflowSchema';
import { z } from 'zod';

export const HTTP_METHODS = [
  { label: 'GET', value: 'GET' },
  { label: 'POST', value: 'POST' },
  { label: 'PUT', value: 'PUT' },
  { label: 'PATCH', value: 'PATCH' },
  { label: 'DELETE', value: 'DELETE' },
] as const;

export const METHODS_WITH_BODY = ['POST', 'PUT', 'PATCH'] as const;

export type HttpMethodWithBody = (typeof METHODS_WITH_BODY)[number];

export type HttpMethod = (typeof HTTP_METHODS)[number]['value'];

export type DeprecatedHttpRequestBody = Record<
  string,
  string | number | boolean | null | Array<string | number | boolean | null>
>;

export type HttpRequestBody = Record<string, string> | string;

export type HttpRequestFormData = z.infer<
  typeof workflowHttpRequestActionSettingsSchema
>['input'];

export const DEFAULT_JSON_BODY_PLACEHOLDER =
  '{\n  "key": "value"\n "another_key": "{{workflow.variable}}" \n}';
export const JSON_RESPONSE_PLACEHOLDER =
  '{\n  Paste expected call response here to use its keys later in the workflow \n}';
