import { useCallback, useState } from 'react';

import Image from 'next/image';

import { Check, Loader2, Search } from 'lucide-react';

import { LoadingSpinner } from '@/components/shared/loading-spinner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { generateMonthsFromStart } from '@/lib/utils';

import { useMedias } from '@/app/(dashboard)/medias/_config/medias.hooks';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface GalleryTabProps {
  search?: string;
  dateFilter?: string;
  onFiltersChange?: (search: string, filterDate?: string) => void;
  onSelectImage?: (url: string) => void;
}

export function GalleryTab({
  search = '',
  dateFilter,
  onFiltersChange,
  onSelectImage,
}: GalleryTabProps) {
  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching } = useMedias(
    {
      searchTerm: search,
      dateFilter,
      page,
      limit: 24, // Show more images per page
    },
    undefined,
    true
  );

  const images = data?.data || [];
  const meta = data?.meta;

  const handleLoadMore = useCallback(() => {
    if (meta?.hasNextPage && !isFetching) {
      setPage((prev) => prev + 1);
    }
  }, [meta?.hasNextPage, isFetching]);

  const handleFiltersChange = useCallback(
    (newSearch: string, newDateFilter?: string) => {
      onFiltersChange?.(newSearch, newDateFilter);
      setPage(1); // Reset to first page when filters change
    },
    [onFiltersChange]
  );

  return (
    <div className='size-full flex flex-col justify-between space-y-4'>
      {/* Filters */}
      <div className='flex flex-col sm:flex-row sm:justify-between gap-4 border-y py-4'>
        <div className='flex gap-2'>
          <div className='w-full space-y-2'>
            <Label>Filter by Date</Label>
            <Select
              value={dateFilter || 'all'}
              onValueChange={(value) =>
                handleFiltersChange(search, value === 'all' ? undefined : value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder='Select month' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Dates</SelectItem>
                {generateMonthsFromStart('2026-1')
                  .filter((m) => m.value !== undefined)
                  .map((month) => (
                    <SelectItem key={month.value} value={month.value!}>
                      {month.label}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className='space-y-2'>
          <Label htmlFor='search'>Search</Label>
          <div className='relative'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
            <Input
              id='search'
              placeholder='Search images...'
              value={search}
              onChange={(e) => handleFiltersChange(e.target.value, dateFilter)}
              className='pl-10'
            />
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4 overflow-auto flex-1'>
        {isLoading && images.length === 0 ? (
          <div className='col-span-full flex justify-center items-center py-12'>
            <LoadingSpinner />
          </div>
        ) : (
          images.map((image) => (
            <div
              key={image.key}
              className='relative aspect-square group cursor-pointer border rounded-lg overflow-hidden hover:shadow-md transition-shadow'
              onClick={() => onSelectImage?.(image.url)}
            >
              <Image
                src={image.url}
                alt={image.name}
                sizes='100vw'
                className='object-cover'
                fill
              />
              <div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
                <Button size='sm' variant='secondary'>
                  <Check className='h-4 w-4 mr-1' />
                  Select
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {images.length === 0 && !isLoading && (
        <div className='flex justify-center items-center text-gray-500 h-full'>
          No images found. Try adjusting your filters.
        </div>
      )}

      {/* Pagination Info and Load More */}
      {meta && (
        <div className='flex flex-col justify-end gap-2 items-center text-sm text-gray-600'>
          <span>
            Showing {images.length} of {meta.total} images
          </span>
          {meta.hasNextPage && (
            <Button
              variant='outline'
              size='sm'
              onClick={handleLoadMore}
              disabled={isFetching}
            >
              {isFetching ? (
                <>
                  <Loader2 className='h-4 w-4 mr-2 animate-spin' />
                  Loading...
                </>
              ) : (
                'Load More'
              )}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
