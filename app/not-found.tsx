import Link from 'next/link';

import { Button } from '@/components/ui/button';

type Props = {
  title?: string;
  description?: string;
};
export default function NotFound({
  title = 'Page Not Found',
  description,
}: Props) {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center gap-6 text-center'>
      <div className='space-y-2'>
        <h1 className='text-8xl font-bold text-muted-foreground/30'>404</h1>
        <h2 className='text-2xl font-semibold'>{title}</h2>
        <p className='text-muted-foreground'>
          {description ||
            "The page you're looking for doesn't exist or has been moved."}
        </p>
      </div>
      <Button asChild>
        <Link href='/dashboard'>Back to Dashboard</Link>
      </Button>
    </div>
  );
}
