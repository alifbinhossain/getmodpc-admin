import { StatsCardsSkeleton } from './_components/stats-cards-skeleton';

export default function Loading() {
  return (
    <div className='space-y-6'>
      <div className='flex justify-between gap-2'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>Dashboard</h1>
          <p className='text-muted-foreground'>
            Welcome back! Here&apos;s what&apos;s happening today.
          </p>
        </div>
      </div>
      <StatsCardsSkeleton />
    </div>
  );
}
