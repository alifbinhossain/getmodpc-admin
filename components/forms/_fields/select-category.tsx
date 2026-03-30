'use client';

import { ButtonGroup } from '@/components/ui/button-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';

import DeleteButton from '../_helper/delete-button';
import { FormBase } from '../_helper/form-base';

type Category = {
  id: string;
  name: string;
  slug: string;
};

type ParentCategory = {
  parent_id: string;
  parent_name: string;
  parent_slug: string;
  categories: Category[];
};

interface Props {
  options: ParentCategory[];
  isLoading?: boolean;
  disabled?: boolean;
  placeholder?: string;
  valueType?: 'string' | 'number';
  fieldProps?: any;
}

export const FormCategorySelect = ({
  options,
  isLoading,
  disabled,
  placeholder = 'Select category',
  valueType = 'string',
  fieldProps,
  ...props
}: Props & any) => {
  return (
    <FormBase {...props}>
      {(field) =>
        isLoading ? (
          <Skeleton className='h-9 w-full rounded border border-input' />
        ) : (
          <Select
            value={field?.value?.toString()}
            onValueChange={(value) => {
              const finalValue = valueType === 'number' ? Number(value) : value;

              field.onChange(finalValue);
              fieldProps?.onValueChange?.(finalValue);
            }}
            disabled={disabled}
          >
            <ButtonGroup>
              <SelectTrigger className='flex-1'>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>

              {field.value && (
                <DeleteButton
                  disabled={disabled}
                  onClick={() => field.onChange('')}
                />
              )}
            </ButtonGroup>

            <SelectContent>
              {options.map((parent: ParentCategory) => (
                <div key={parent.parent_id}>
                  {/* Parent selectable */}
                  <SelectItem value={parent.parent_id}>
                    {parent.parent_name}
                  </SelectItem>

                  {/* Children */}
                  {parent.categories.map((child: Category) => (
                    <SelectItem
                      key={child.id}
                      value={child.id}
                      className='pl-5 text-muted-foreground'
                    >
                      {child.name}
                    </SelectItem>
                  ))}
                </div>
              ))}
            </SelectContent>
          </Select>
        )
      }
    </FormBase>
  );
};
