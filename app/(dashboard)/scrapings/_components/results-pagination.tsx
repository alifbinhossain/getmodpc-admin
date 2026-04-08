import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

import { formatNumber } from '@/lib/utils';

type ResultsPaginationProps = {
  currentPage: number;
  isPending?: boolean;
  onPageChange: (page: number) => void;
  totalPages: number;
};

function ResultsPagination({
  currentPage,
  isPending = false,
  onPageChange,
  totalPages,
}: ResultsPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pageItems = buildPaginationItems(currentPage, totalPages);

  return (
    <Pagination className='flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
      <div className='text-xs text-muted-foreground'>
        Page {formatNumber(currentPage)} of {formatNumber(totalPages)}
      </div>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={currentPage <= 1 ? 'pointer-events-none opacity-50' : ''}
            href='#'
            onClick={(event) => {
              event.preventDefault();

              if (currentPage > 1 && !isPending) {
                onPageChange(currentPage - 1);
              }
            }}
          />
        </PaginationItem>
        {pageItems.map((item, index) => (
          <PaginationItem key={`${item}-${index}`}>
            {item === 'ellipsis' ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href='#'
                isActive={item === currentPage}
                onClick={(event) => {
                  event.preventDefault();

                  if (item !== currentPage && !isPending) {
                    onPageChange(item);
                  }
                }}
              >
                {item}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            className={
              currentPage >= totalPages ? 'pointer-events-none opacity-50' : ''
            }
            href='#'
            onClick={(event) => {
              event.preventDefault();

              if (currentPage < totalPages && !isPending) {
                onPageChange(currentPage + 1);
              }
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

function buildPaginationItems(currentPage: number, totalPages: number) {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, 4, 'ellipsis', totalPages] as const;
  }

  if (currentPage >= totalPages - 2) {
    return [
      1,
      'ellipsis',
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ] as const;
  }

  return [
    1,
    'ellipsis',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    'ellipsis',
    totalPages,
  ] as const;
}

export default ResultsPagination;
