import React from 'react';

import { Plus, Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { cn } from '@/lib/utils';

import { IFormArray } from '../_config/form-types';
import { FormBase } from '../_helper/form-base';

export const FormArrayField = ({
  fieldProps,
  placeholder,
  disabled,
  ...props
}: IFormArray) => {
  return (
    <FormBase {...props}>
      {(field) => {
        if (!fieldProps || fieldProps.type !== 'array') return null;

        const value: any[] = Array.isArray(field.value) ? field.value : [];
        const isObjectArray = fieldProps.arrayType === 'object';

        const handleAdd = () => {
          const newItem = isObjectArray ? fieldProps.defaultItem || {} : '';
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
              <div key={index} className='flex gap-2 items-center'>
                {isObjectArray ? (
                  Object.keys(fieldProps.objectFields || {}).map((key) => (
                    <Input
                      key={key}
                      placeholder={fieldProps.objectFields?.[key] || key}
                      value={item?.[key] || ''}
                      onChange={(e) => handleChange(index, key, e.target.value)}
                    />
                  ))
                ) : (
                  <Input
                    placeholder={placeholder}
                    value={item || ''}
                    onChange={(e) => handleChange(index, null, e.target.value)}
                  />
                )}
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
