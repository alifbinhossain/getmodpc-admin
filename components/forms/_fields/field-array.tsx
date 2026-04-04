import React from 'react';

import { Plus, Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { IFormArray } from '../_config/form-types';
import { FormBase } from '../_helper/form-base';

export const FormArrayField: IFormArray = ({
  fieldProps,
  render,
  ...props
}) => {
  return (
    <FormBase {...props}>
      {(field) => {
        if (!fieldProps || fieldProps.type !== 'array') return null;

        const value: any[] = Array.isArray(field.value) ? field.value : [];
        const isObjectArray = fieldProps.arrayType === 'object';

        const handleAdd = () => {
          const newItem = isObjectArray ? fieldProps.defaultItem || {} : '';
          console.log({ newItem });
          field.onChange([...value, newItem]);
        };

        const handleRemove = (index: number) => {
          const newValue = value.filter((_, i) => i !== index);
          field.onChange(newValue);
        };

        const handleChange = (index: number, key: string | null, val: any) => {
          const newValue = [...value];
          if (isObjectArray && key) {
            newValue[index] = { ...newValue[index], [key]: val };
          } else {
            newValue[index] = val;
          }
          field.onChange(newValue);
        };

        return (
          <div className='space-y-2'>
            {value.map((item, index) => (
              <div key={index} className='flex gap-2 items-end'>
                {render({
                  name: field.name,
                  onChange: (key: string | null, val: any) =>
                    handleChange(index, key, val),
                  value: item,
                  onBlur: field.onBlur,
                  index,
                  ref: field.ref,
                })}
                <Button
                  type='button'
                  variant='destructive'
                  size='icon'
                  onClick={() => handleRemove(index)}
                >
                  <Trash className='size-4' />
                </Button>
              </div>
            ))}

            <Button type='button' onClick={handleAdd} variant='outline'>
              <Plus className='size-4 mr-1' /> Add
            </Button>
          </div>
        );
      }}
    </FormBase>
  );
};
