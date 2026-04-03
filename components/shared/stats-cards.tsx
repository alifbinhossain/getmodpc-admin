import { IDashboard } from '@/types';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// =============================================================================
// STATS DATA (swap with real API query hook in production)
// =============================================================================

type Props = {
  stats: IDashboard[];
};
export function StatsCards({ stats }: Props) {
  return (
    <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
      {[...stats]?.map((stat) => {
        // const Icon = stat.icon;
        return (
          <Card key={stat.title} className='transition-shadow hover:shadow-md'>
            <CardHeader className='flex flex-row items-center justify-between pb-2'>
              <CardTitle className='text-sm font-medium text-muted-foreground'>
                {stat.title}
              </CardTitle>
              {/* <div className={cn('rounded-lg p-2', stat.bg)}>
                <Icon className={cn('h-4 w-4', stat.color)} />
              </div> */}
            </CardHeader>
            <CardContent>
              <p className='text-2xl font-bold tracking-tight'>{stat.value}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
