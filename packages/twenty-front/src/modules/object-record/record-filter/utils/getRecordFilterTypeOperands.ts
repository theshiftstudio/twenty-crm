import { FilterableFieldType } from '@/object-record/record-filter/types/FilterableFieldType';
import { ViewFilterOperand as RecordFilterOperand } from '@/views/types/ViewFilterOperand';
import { PickLiteral } from '~/types/PickLiteral';

const emptyOperands = [
  RecordFilterOperand.IsEmpty,
  RecordFilterOperand.IsNotEmpty,
] as const;

// I don't know how to name this abstraction
export type PrastoinFilterableRecordFieldType = PickLiteral<
  FilterableFieldType,
  | 'TEXT'
  | 'RATING'
  | 'DATE_TIME'
  | 'DATE'
  | 'NUMBER'
  | 'BOOLEAN'
  | 'ARRAY'
  | 'SELECT'
  | 'MULTI_SELECT'
  // | 'RELATION'
>;
export const RECORD_FILTER_TYPE_OPERANDS = {
  TEXT: {
    filterOperands: [
      {
        operand: RecordFilterOperand.Contains,
        compute: (value: string): string => value,
      },
      {
        operand: RecordFilterOperand.DoesNotContain,
        compute: (_value: string): undefined => undefined,
      },
      {
        operand: RecordFilterOperand.IsEmpty,
        compute: (_value: string): undefined => undefined,
      },
      {
        operand: RecordFilterOperand.IsNotEmpty,
        compute: (value: string): string => value,
      },
    ],
  }, //ok
  NUMBER: {
    filterOperands: [
      {
        operand: RecordFilterOperand.GreaterThan,
        compute: (value: string): number => Number(value) + 1,
      },
      {
        operand: RecordFilterOperand.LessThan,
        compute: (value: string): number => Number(value) - 1,
      },
      {
        operand: RecordFilterOperand.IsEmpty,
        compute: (_value: string): undefined => undefined,
      },
      {
        operand: RecordFilterOperand.IsNotEmpty,
        compute: (value: string): number => Number(value),
      },
    ],
  }, // ok
  // TODO facto
  DATE_TIME: {
    filterOperands: [
      {
        operand: RecordFilterOperand.Is,
        compute: (value: string): Date => new Date(value),
      },
      {
        operand: RecordFilterOperand.IsNot,
        compute: (value: string): Date => new Date(value),
      },
      {
        operand: RecordFilterOperand.IsRelative,
        compute: (value: string): Date => new Date(value),
      },
      {
        operand: RecordFilterOperand.IsInPast,
        compute: (value: string): Date => new Date(value),
      },
      {
        operand: RecordFilterOperand.IsInFuture,
        compute: (value: string): Date => new Date(value),
      },
      {
        operand: RecordFilterOperand.IsToday,
        compute: (_value: string): Date => new Date(),
      },
      {
        operand: RecordFilterOperand.IsBefore,
        compute: (value: string): Date => new Date(value),
      },
      {
        operand: RecordFilterOperand.IsAfter,
        compute: (value: string): Date => new Date(value),
      },
      {
        operand: RecordFilterOperand.IsEmpty,
        compute: (_value: string): undefined => undefined,
      },
      {
        operand: RecordFilterOperand.IsNotEmpty,
        compute: (value: string): Date => new Date(value),
      },
    ],
  }, // ok
  DATE: {
    filterOperands: [
      {
        operand: RecordFilterOperand.Is,
        compute: (value: string): Date => new Date(value),
      },
      {
        operand: RecordFilterOperand.IsNot,
        compute: (value: string): Date => new Date(value),
      },
      {
        operand: RecordFilterOperand.IsRelative,
        compute: (value: string): Date => new Date(value),
      },
      {
        operand: RecordFilterOperand.IsInPast,
        compute: (value: string): Date => new Date(value),
      },
      {
        operand: RecordFilterOperand.IsInFuture,
        compute: (value: string): Date => new Date(value),
      },
      {
        operand: RecordFilterOperand.IsToday,
        compute: (_value: string): Date => new Date(),
      },
      {
        operand: RecordFilterOperand.IsBefore,
        compute: (value: string): Date => new Date(value),
      },
      {
        operand: RecordFilterOperand.IsAfter,
        compute: (value: string): Date => new Date(value),
      },
      {
        operand: RecordFilterOperand.IsEmpty,
        compute: (_value: string): undefined => undefined,
      },
      {
        operand: RecordFilterOperand.IsNotEmpty,
        compute: (value: string): Date => new Date(value),
      },
    ],
  }, // ok
  RATING: {
    filterOperands: [
      {
        operand: RecordFilterOperand.Is,
        compute: (_value: string): boolean => true,
      },
      {
        operand: RecordFilterOperand.GreaterThan,
        compute: (_value: string): boolean => true,
      },
      {
        operand: RecordFilterOperand.LessThan,
        compute: (_value: string): boolean => true,
      },
      {
        operand: RecordFilterOperand.IsEmpty,
        compute: (_value: string): undefined => undefined,
      },
      {
        operand: RecordFilterOperand.IsNotEmpty,
        compute: (value: string): string => value,
      },
    ],
  },

  MULTI_SELECT: {
    filterOperands: [
      {
        operand: RecordFilterOperand.Contains,
        compute: (_value: string): boolean => true,
      },
      {
        operand: RecordFilterOperand.DoesNotContain,
        compute: (_value: string): boolean => true,
      },
      ...emptyOperands.map((operand) => ({
        operand,
        compute: (_value: string): undefined => undefined,
      })),
    ],
  },
  SELECT: {
    filterOperands: [
      {
        operand: RecordFilterOperand.Is,
        compute: (_value: string): boolean => true,
      },
      {
        operand: RecordFilterOperand.IsNot,
        compute: (_value: string): boolean => true,
      },
      ...emptyOperands.map((operand) => ({
        operand,
        compute: (_value: string): undefined => undefined,
      })),
    ],
  },
  ARRAY: {
    filterOperands: [
      {
        operand: RecordFilterOperand.Contains,
        compute: (value: string): string => value,
      },
      {
        operand: RecordFilterOperand.DoesNotContain,
        compute: (_value: string): undefined => undefined,
      },
      {
        operand: RecordFilterOperand.IsEmpty,
        compute: (_value: string): undefined => undefined,
      },
      {
        operand: RecordFilterOperand.IsNotEmpty,
        compute: (value: string): string => value,
      },
    ],
  }, // ok
  BOOLEAN: {
    filterOperands: [
      {
        operand: RecordFilterOperand.Is,
        compute: (value: string): boolean => value === 'true',
      },
      {
        operand: RecordFilterOperand.IsNot,
        compute: (_value: string): undefined => undefined,
      },
    ],
  }, //ok
} as const;
// TODO expect record to cover all PrastoinFilterableRecordFieldType values

export type RecordFilterOperands<T extends PrastoinFilterableRecordFieldType> =
  (typeof RECORD_FILTER_TYPE_OPERANDS)[T]['filterOperands'][number]['operand'];
