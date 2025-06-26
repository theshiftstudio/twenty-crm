type DeprecatedBody = Record<
  string,
  | string
  | number
  | boolean
  | null
  | undefined
  | Array<string | number | boolean | null>
>;

export type WorkflowHttpRequestActionInput = {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  headers?: Record<string, string>;
  body?: DeprecatedBody | string;
};
