import { DeprecatedHttpRequestBody } from '../constants/HttpRequest';

export const hasNonStringValues = (
  obj?: DeprecatedHttpRequestBody,
): boolean => {
  if (!obj) {
    return false;
  }
  return Object.values(obj).some(
    (value) =>
      value !== null && value !== undefined && typeof value !== 'string',
  );
};
