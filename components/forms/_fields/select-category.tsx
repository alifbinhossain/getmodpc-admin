'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Skeleton } from '@/components/ui/skeleton';

import { IFormSelectCategory } from '../_config/form-types';
import { FormBase } from '../_helper/form-base';

export const FormCategorySelect: IFormSelectCategory = ({
  options,
  isLoading,
  disabled,
  placeholder = 'Select category',
  multiple = false,
  fieldProps,
  ...props
}) => {
  return (
    <FormBase {...props}>
      {(field) => {
        const selectedValues: string[] = Array.isArray(field.value)
          ? field.value.filter(
              (value: unknown): value is string => typeof value === 'string'
            )
          : [];
        const selectedValue =
          typeof field.value === 'string' ? field.value : '';

        const isSelected = (id: string) => {
          return multiple ? selectedValues.includes(id) : selectedValue === id;
        };

        const handleSelect = (id: string) => {
          let newValue: string | string[] | null;

          if (multiple) {
            if (selectedValues.includes(id)) {
              newValue = selectedValues.filter((value) => value !== id);
            } else {
              newValue = [...selectedValues, id];
            }
          } else {
            newValue = selectedValue === id ? null : id;
          }

          field.onChange(newValue);
          fieldProps?.onValueChange?.(newValue);
        };

        if (isLoading) {
          return <Skeleton className='h-9 w-full rounded border' />;
        }

        return (
          <div className='border rounded-md p-3 space-y-2'>
            <div className='space-y-2 max-h-60 overflow-auto'>
              {options.length === 0 && (
                <p className='text-sm text-muted-foreground'>{placeholder}</p>
              )}

              {options.map((parent) => {
                const hasChildren = parent.categories.length > 0;

                return (
                  <div key={parent.parent_id} className='space-y-1'>
                    <div className='flex items-center gap-2'>
                      <Checkbox
                        checked={isSelected(parent.parent_id)}
                        disabled={disabled || hasChildren}
                        onCheckedChange={() =>
                          !hasChildren && handleSelect(parent.parent_id)
                        }
                      />
                      <span
                        className={
                          hasChildren
                            ? 'font-medium text-muted-foreground'
                            : 'font-medium'
                        }
                      >
                        {parent.parent_name}
                      </span>
                    </div>

                    {hasChildren && (
                      <div className='pl-6 space-y-1'>
                        {parent.categories.map((child) => (
                          <div
                            key={child.id}
                            className='flex items-center gap-2'
                          >
                            <Checkbox
                              checked={isSelected(child.id)}
                              disabled={disabled}
                              onCheckedChange={() => handleSelect(child.id)}
                            />
                            <span>{child.name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      }}
    </FormBase>
  );
};
