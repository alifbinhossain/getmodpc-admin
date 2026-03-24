import { SelectOption } from '@/types';
import { ControllerRenderProps, UseFormRegister } from 'react-hook-form';

import { InputProps } from '@/components/ui/input';
import { SelectProps } from '@/components/ui/select';
import { TextareaProps } from '@/components/ui/textarea';

import { FormControlFunc } from '../_helper/form-base';

export type IFormInput = FormControlFunc<{
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement>,
    field?: ControllerRenderProps<any, any>
  ) => void;
  fieldProps?: InputProps;
}>;

export type IFormTextarea = FormControlFunc<{
  fieldProps?: TextareaProps;
  maxChars?: number;
}>;

export type IFormPhone = FormControlFunc<{
  register: UseFormRegister<any>;
  fieldProps?: InputProps;
}>;

export type IFormSelect = FormControlFunc<{
  fieldProps?: SelectProps;
  options: SelectOption[];
  valueType?: 'string' | 'number';
  isLoading?: boolean;
}>;
