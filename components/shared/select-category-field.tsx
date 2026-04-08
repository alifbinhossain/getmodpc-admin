import React from 'react';

import { FormCategorySelect } from '@/components/forms/_fields/select-category';

import { useCategoriesByGroup } from '@/app/(dashboard)/categories/_config/category.hooks';

type Props = {
  control: any;
  name?: string;
  multiple?: boolean;
  showLabel?: boolean;
};
function SelectCategoryField({
  control,
  name = 'parent_cat_id',
  multiple,
  ...props
}: Props) {
  const { data, isLoading } = useCategoriesByGroup();
  return (
    <FormCategorySelect
      isLoading={isLoading}
      control={control}
      name={name}
      options={data?.data ?? []}
      multiple={multiple}
      {...props}
    />
  );
}

export default SelectCategoryField;
