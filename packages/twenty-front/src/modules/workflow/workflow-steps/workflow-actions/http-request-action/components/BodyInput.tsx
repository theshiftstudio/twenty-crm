import { FormFieldInputContainer } from '@/object-record/record-field/form-types/components/FormFieldInputContainer';
import { FormRawJsonFieldInput } from '@/object-record/record-field/form-types/components/FormRawJsonFieldInput';

import { FormTextFieldInput } from '@/object-record/record-field/form-types/components/FormTextFieldInput';
import { InputLabel } from '@/ui/input/components/InputLabel';
import { Select } from '@/ui/input/components/Select';
import {
  HttpContentType,
  httpContentTypeSchema,
} from '@/workflow/workflow-steps/workflow-actions/http-request-action/constants/HttpContentTypeSchema';
import {
  DEFAULT_JSON_BODY_PLACEHOLDER,
  DeprecatedHttpRequestBody,
} from '@/workflow/workflow-steps/workflow-actions/http-request-action/constants/HttpRequest';
import { WorkflowVariablePicker } from '@/workflow/workflow-variables/components/WorkflowVariablePicker';
import { CAPTURE_ALL_VARIABLE_TAG_INNER_REGEX } from '@/workflow/workflow-variables/constants/CaptureAllVariableTagInnerRegex';
import styled from '@emotion/styled';
import { isString } from '@sniptt/guards';
import { useState } from 'react';
import { parseJson } from 'twenty-shared/utils';
import { IconFileText, IconKey } from 'twenty-ui/display';
import { SelectOption } from 'twenty-ui/input';
import { KeyValuePairInput } from './KeyValuePairInput';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const StyledSelectDropdown = styled(Select)`
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

type BodyInputProps = {
  label?: string;
  defaultValue?: DeprecatedHttpRequestBody | string;
  defaultContentType?: string;
  onChange: (value?: DeprecatedHttpRequestBody | string) => void;
  readonly?: boolean;
};

export const BodyInput = ({
  defaultValue,
  defaultContentType,
  onChange,
  readonly,
}: BodyInputProps) => {
  const defaultBodyAsObject = isString(defaultValue)
    ? (parseJson<DeprecatedHttpRequestBody>(defaultValue) ?? defaultValue)
    : defaultValue;

  const [contentType, setContentType] = useState<HttpContentType | null>(
    () =>
      httpContentTypeSchema.safeParse(defaultContentType).data ??
      'application/json',
  );

  const [jsonString, setJsonString] = useState<string | null>(
    isString(defaultValue)
      ? defaultValue
      : JSON.stringify(defaultValue, null, 2),
  );
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const validateJson = (value: string | null): boolean => {
    if (!value?.trim()) {
      setErrorMessage(undefined);
      return true;
    }

    try {
      const valueWithoutVariables = value.replaceAll(
        CAPTURE_ALL_VARIABLE_TAG_INNER_REGEX,
        'null',
      );
      console.log({ valueWithoutVariables });

      JSON.parse(valueWithoutVariables);

      setErrorMessage(undefined);
      return true;
    } catch (e) {
      setErrorMessage(String(e));
      return false;
    }
  };

  const handleKeyValueChange = (value: Record<string, string>) => {
    onChange(value);
    setErrorMessage(undefined);
  };

  const handleJsonChange = (value: string | null) => {
    setJsonString(value);

    if (!value?.trim()) {
      onChange();
      setErrorMessage(undefined);
      return;
    }

    try {
      const valueWithoutVariables = value.replaceAll(
        CAPTURE_ALL_VARIABLE_TAG_INNER_REGEX,
        'null',
      );
      console.log({ valueWithoutVariables });

      JSON.parse(valueWithoutVariables);

      onChange(value);
    } catch {
      // Do nothing, validation will happen on blur
    }
  };

  const handleModeChange = (isRawJson: boolean) => {
    setIsRawJson(isRawJson);
    onChange();
    setJsonString(null);
  };

  const handleBlur = () => {
    if (isRawJson && Boolean(jsonString)) {
      validateJson(jsonString);
    }
  };

  return (
    <FormFieldInputContainer>
      <InputLabel>Body Input</InputLabel>

      <StyledSelectDropdown
        options={
          [
            { label: 'json', value: 'application/json', Icon: IconFileText },
            { label: 'form-data', value: 'multipart/form-data', Icon: IconKey },
            {
              label: 'x-www-form-urlencoded',
              value: 'application/x-www-form-urlencoded',
              Icon: IconKey,
            },
            { label: 'text', value: 'text/plain', Icon: IconKey },
            { label: 'none', value: null, Icon: IconFileText },
          ] satisfies SelectOption<HttpContentType | null>[]
        }
        dropdownId="body-content-type"
        value={contentType}
        onChange={(value) => setContentType(value as HttpContentType | null)}
        disabled={readonly}
      />

      <StyledContainer>
        {contentType === 'application/json' ? (
          <FormRawJsonFieldInput
            placeholder={DEFAULT_JSON_BODY_PLACEHOLDER}
            readonly={readonly}
            defaultValue={jsonString}
            error={errorMessage}
            onBlur={handleBlur}
            onChange={handleJsonChange}
            VariablePicker={WorkflowVariablePicker}
          />
        ) : contentType === 'text/plain' ? (
          <FormTextFieldInput
            placeholder="Enter plain text body content"
            readonly={readonly}
            defaultValue={jsonString}
            error={errorMessage}
            onBlur={handleBlur}
            onChange={handleJsonChange}
            VariablePicker={WorkflowVariablePicker}
          />
        ) : contentType === null ? (
          <div>No body</div>
        ) : (
          <KeyValuePairInput
            defaultValue={defaultValue as Record<string, string>}
            onChange={handleKeyValueChange}
            readonly={readonly}
            keyPlaceholder="Property name"
            valuePlaceholder="Property value"
          />
        )}
      </StyledContainer>
    </FormFieldInputContainer>
  );
};
