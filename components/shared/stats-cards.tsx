import { Users, Package, TrendingUp, DollarSign } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

// =============================================================================
// STATS DATA (swap with real API query hook in production)
// =============================================================================

const STATS = [
  {
    title: 'Total Users',
    value: '12,842',
    change: '+18.2%',
    trend: 'up',
    description: 'vs. last month',
    icon: Users,
    color: 'text-blue-500',
    bg: 'bg-blue-50 dark:bg-blue-950/30',
  },
  {
    title: 'Total Products',
    value: '4,391',
    change: '+4.6%',
    trend: 'up',
    description: 'vs. last month',
    icon: Package,
    color: 'text-violet-500',
    bg: 'bg-violet-50 dark:bg-violet-950/30',
  },
  {
    title: 'Revenue',
    value: '$284,392',
    change: '+12.5%',
    trend: 'up',
    description: 'vs. last month',
    icon: DollarSign,
    color: 'text-emerald-500',
    bg: 'bg-emerald-50 dark:bg-emerald-950/30',
  },
  {
    title: 'Growth Rate',
    value: '24.8%',
    change: '+3.1%',
    trend: 'up',
    description: 'vs. last month',
    icon: TrendingUp,
    color: 'text-amber-500',
    bg: 'bg-amber-50 dark:bg-amber-950/30',
  },
]

export function StatsCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {STATS.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title} className="transition-shadow hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={cn('rounded-lg p-2', stat.bg)}>
                <Icon className={cn('h-4 w-4', stat.color)} />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                <span
                  className={cn(
                    'font-medium',
                    stat.trend === 'up' ? 'text-emerald-600' : 'text-red-600',
                  )}
                >
                  {stat.change}
                </span>{' '}
                {stat.description}
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
