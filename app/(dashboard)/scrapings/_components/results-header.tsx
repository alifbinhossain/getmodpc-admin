import type { ReactNode } from 'react';

import type { PaginationMeta } from '@/types';
import { LoaderCircle } from 'lucide-react';

import { formatNumber } from '@/lib/utils';

type ResultsHeaderProps = {
  description?: ReactNode;
  isFetching?: boolean;
  isLoading?: boolean;
  meta?: PaginationMeta;
  resultsCount: number;
  title: ReactNode;
  totalLabel: string;
};

function ResultsHeader({
  description,
  isFetching = false,
  isLoading = false,
  meta,
  resultsCount,
  title,
  totalLabel,
}: ResultsHeaderProps) {
  const showLoading = isLoading || isFetching;
  const startItem =
    resultsCount > 0 && meta ? (meta.page - 1) * meta.limit + 1 : 0;
  const endItem = resultsCount > 0 && meta ? startItem + resultsCount - 1 : 0;

  return (
    <div className='rounded-md border bg-gray-100 p-4'>
      <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          {title}
          {description}
          {meta ? (
            <p className='text-xs text-muted-foreground'>
              {resultsCount > 0
                ? `Showing ${formatNumber(startItem)}-${formatNumber(endItem)} of ${formatNumber(meta.total)} ${totalLabel}`
                : `Showing 0 of ${formatNumber(meta.total)} ${totalLabel}`}
            </p>
          ) : showLoading ? (
            <p className='text-xs text-muted-foreground'>Loading results...</p>
          ) : null}
        </div>
        {showLoading ? (
          <p className='flex items-center gap-1 text-xs font-medium text-muted-foreground'>
            <LoaderCircle className='size-3.5 animate-spin' />
            {isLoading ? 'Loading results...' : 'Updating results...'}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export default ResultsHeader;
