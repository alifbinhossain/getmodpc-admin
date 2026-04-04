'use client';

import React, { useState } from 'react';

import AccordionContainer from '@/components/shared/accordion-container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type Props = {
  form: any;
  title: string;
  name: string;
};

function MultiInputField({ form, title, name }: Props) {
  const [value, setValue] = useState('');

  // ✅ safe watch
  const values: string[] = form.watch(name) || [];

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleAdd = () => {
    if (!value.trim()) return;

    // ✅ split + clean
    const splitByComma = value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);

    const existing = form.getValues(name) || [];

    // ✅ remove duplicates
    const unique = [...new Set([...existing, ...splitByComma])];

    form.setValue(name, unique, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });

    setValue('');
  };

  const handleRemove = (index: number) => {
    const updated = values.filter((_, i) => i !== index);

    form.setValue(name, updated, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  return (
    <AccordionContainer title={title} value={title.split(' ').join('-')}>
      <div className='space-y-4'>
        {/* Input */}
        <div className='flex gap-2'>
          <Input
            value={value}
            onChange={handleOnChange}
            placeholder='Enter values (comma separated)'
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAdd();
              }
            }}
          />
          <Button type='button' disabled={!value.trim()} onClick={handleAdd}>
            Add
          </Button>
        </div>

        <span className='text-xs text-muted-foreground inline-block '>
          Separate <span className='lowercase'>{title}</span> with commas
        </span>

        {/* values List */}
        {values.length > 0 && (
          <div className='flex flex-wrap gap-2'>
            {values.map((item, index) => (
              <div
                key={`${item}-${index}`}
                className='flex items-center gap-2 bg-muted px-2 py-1 rounded-md'
              >
                <span
                  className='bg-red-500 text-white rounded-full size-4 flex items-center justify-center cursor-pointer'
                  onClick={() => handleRemove(index)}
                >
                  &times;
                </span>
                <span className='text-sm text-muted-foreground'>{item}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </AccordionContainer>
  );
}

export default MultiInputField;
