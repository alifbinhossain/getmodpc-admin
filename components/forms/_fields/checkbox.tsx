'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

import { IFormCheckbox } from '../_config/form-types';
import { FormBase } from '../_helper/form-base';

export const FormCheckbox: IFormCheckbox = ({
  fieldProps,
  disabled,
  label,
  ...props
}) => {
  return (
    <FormBase {...props}>
      {(field) => (
        <div className='flex items-center gap-2'>
          <Checkbox
            checked={!!field.value}
            onCheckedChange={(checked) => {
              const value = checked === true;
              field.onChange(value);
              fieldProps?.onValueChange?.(value);
            }}
            disabled={disabled}
            id={field.id}
            {...fieldProps}
          />
          {label && (
            <Label htmlFor={field.id} className='text-sm'>
              {label}
            </Label>
          )}
        </div>
      )}
    </FormBase>
  );
};
