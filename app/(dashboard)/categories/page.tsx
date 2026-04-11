import type { Metadata } from 'next';
import { cookies } from 'next/headers';

import { CategoryRecord } from '@/types/category';

import api from '@/lib/axios';
import { fallBackData } from '@/lib/utils';

import Categories from './_components/categories';

export const metadata: Metadata = {
  title: 'Categories',
};

export default async function CategoriesPage() {
  const token = (await cookies()).get('accessToken')?.value;
  const response = await api
    .list<CategoryRecord>('/categories', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch(() => fallBackData<CategoryRecord>());
  return <Categories initialData={response} />;
}
