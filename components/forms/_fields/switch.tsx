'use client';

import { Switch } from '@/components/ui/switch';

import { IFormSwitch } from '../_config/form-types';
import { FormBase } from '../_helper/form-base';

export const FormSwitch: IFormSwitch = ({ fieldProps, disabled, ...props }) => {
  return (
    <FormBase {...props}>
      {(field) => (
        <div className='flex items-center gap-2'>
          <Switch
            checked={!!field.value} // ensure boolean
            onCheckedChange={(checked) => {
              field.onChange(checked);
              fieldProps?.onValueChange?.(checked);
            }}
            disabled={disabled}
            {...fieldProps}
          />
        </div>
      )}
    </FormBase>
  );
};
