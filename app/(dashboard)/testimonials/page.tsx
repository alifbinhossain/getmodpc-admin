import type { Metadata } from 'next';

import Testimonials from './_components/testimonials';
import { testimonialsService } from './_config/testimonials.service';

export const metadata: Metadata = { title: 'Testimonials' };

export default async function TestimonialsPage() {
  const response = await testimonialsService.getTestimonials();
  return <Testimonials initialData={response} />;
}
