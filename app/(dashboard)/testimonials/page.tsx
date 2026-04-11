import type { Metadata } from 'next';
import { cookies } from 'next/headers';

import { TestimonialRecord } from '@/types/testimonial';

import api from '@/lib/axios';
import { fallBackData } from '@/lib/utils';

import Testimonials from './_components/testimonials';

export const metadata: Metadata = { title: 'Testimonials' };

export default async function TestimonialsPage() {
  const token = (await cookies()).get('accessToken')?.value;
  const response = await api
    .list<TestimonialRecord>('/testimonials', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch(() => fallBackData<TestimonialRecord>());
  return <Testimonials initialData={response} />;
}
