import { FieldMetadataItemOption } from '@/object-metadata/types/FieldMetadataItem';
import { RecordFilter } from '@/object-record/record-filter/types/RecordFilter';
import { RecordFilterOperand } from '@/object-record/record-filter/types/RecordFilterOperand';
import {
  PrastoinFilterableRecordFieldType,
  RECORD_FILTER_TYPE_OPERANDS,
} from '@/object-record/record-filter/utils/getRecordFilterTypeOperands';

export const buildValueFromFilter = <
  T extends PrastoinFilterableRecordFieldType,
>({
  filter,
  // TODO: handle options to the filter type
  options,
}: {
  filter: Pick<RecordFilter<T>, 'type' | 'operand' | 'value'>;
  options?: FieldMetadataItemOption[];
}): ReturnType<
  (typeof RECORD_FILTER_TYPE_OPERANDS)[T]['filterOperands'][number]['compute']
> => {
  const matchingOperand = RECORD_FILTER_TYPE_OPERANDS[
    filter.type
  ].filterOperands.find((operand) => filter.operand === operand.operand);

  if (matchingOperand === undefined) {
    throw new Error('Filter operand not found should never occur');
  }

  // TODO dig deeper
  // @ts-expect-error Weird inferring from generics
  return matchingOperand.compute(filter.value);
};

// Example
const someBooleanResult = buildValueFromFilter({
  filter: {
    operand: RecordFilterOperand.Is,
    type: 'BOOLEAN',
    value: 'value',
  },
});

const someDateResult = buildValueFromFilter({
  filter: {
    operand: RecordFilterOperand.Is,
    type: 'DATE',
    value: 'value',
  },
});

const someNumberResult = buildValueFromFilter({
  filter: {
    operand: RecordFilterOperand.LessThan,
    type: 'NUMBER',
    value: 'value',
  },
});
