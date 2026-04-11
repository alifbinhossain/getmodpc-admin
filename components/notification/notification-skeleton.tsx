import { Skeleton } from '@/components/ui/skeleton';

export default function NotificationSkeleton() {
  return (
    <div className='relative flex items-start justify-between gap-4 rounded-xl border p-4'>
      <Skeleton className='absolute left-2 top-2 h-3 w-3 rounded-full' />

      <div className='flex flex-col gap-2 w-full pr-10'>
        <Skeleton className='h-4 w-1/3' />

        <Skeleton className='h-3 w-full' />
        <Skeleton className='h-3 w-2/3' />
      </div>

      <div className='flex items-center gap-2'>
        <Skeleton className='h-8 w-8 rounded-md' />
        <Skeleton className='h-8 w-8 rounded-md' />
      </div>
    </div>
  );
}
