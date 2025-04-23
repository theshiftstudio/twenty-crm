import { FilterableFieldType } from '@/object-record/record-filter/types/FilterableFieldType';
import { RecordFilterOperand } from '@/object-record/record-filter/types/RecordFilterOperand';
import {
  RecordFilterOperands
} from '@/object-record/record-filter/utils/getRecordFilterTypeOperands';

export type RecordFilter<T extends FilterableFieldType = FilterableFieldType> = {
  id: string;
  fieldMetadataId: string;
  value: string;
  displayValue: string;
  type: T;
  recordFilterGroupId?: string;
  displayAvatarUrl?: string;
  operand: RecordFilterOperands<T>;
  positionInRecordFilterGroup?: number | null;
  label: string;
  subFieldName?: string | null | undefined;
};


const tmp: RecordFilter<'TEXT'> = {
  id: '1',
  fieldMetadataId: '1',
  value: 'value',
  displayValue: 'displayValue',
  type: 'TEXT',
  // @ts-expect-error
  operand: RecordFilterOperand.IsInFuture,
  label: 'label',
  positionInRecordFilterGroup: null,
}