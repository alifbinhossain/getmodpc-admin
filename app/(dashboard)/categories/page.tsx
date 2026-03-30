import type { Metadata } from 'next';

import Categories from './_components/categories';
import { categoriesService } from './_config/categories.service';

export const metadata: Metadata = { title: 'Categories' };

export default async function CategoriesPage() {
  const response = await categoriesService.getCategories();
  return <Categories initialData={response} />;
}
