import React from 'react';

import { FormCategorySelect } from '@/components/forms/_fields/select-category';

import { useCategoriesByGroup } from '../_config/category.hooks';

type Props = {
  control: any;
};
function SelectCategoryField({ control }: Props) {
  const { data, isLoading } = useCategoriesByGroup();
  return (
    <FormCategorySelect
      isLoading={isLoading}
      control={control}
      name='parent_cat_id'
      required
      options={data?.data}
    />
  );
}

export default SelectCategoryField;
