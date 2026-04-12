import { useCallback, useState } from 'react';

import Image from 'next/image';

import { Check, Loader2, Search, Trash, X } from 'lucide-react';
import { toast } from 'sonner';

import { LoadingSpinner } from '@/components/shared/loading-spinner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { formatFileSize, generateMonthsFromStart } from '@/lib/utils';

import { useMedias } from '@/app/(dashboard)/medias/_config/medias.hooks';
import { mediasService } from '@/app/(dashboard)/medias/_config/medias.service';

import DeleteAlertModal from '../shared/delete-alert-modal';
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
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const { data, isLoading, isFetching, refetch } = useMedias(
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
    <>
      {' '}
      <div className='size-full flex flex-col justify-between space-y-4'>
        {/* Filters */}
        <div className='flex flex-col sm:flex-row sm:justify-between gap-4 border-y py-4'>
          <div className='flex gap-2'>
            <div className='w-full space-y-2'>
              <Label>Filter by Date</Label>
              <Select
                value={dateFilter || 'all'}
                onValueChange={(value) =>
                  handleFiltersChange(
                    search,
                    value === 'all' ? undefined : value
                  )
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
            <div className='flex items-center gap-2'>
              <div className='relative'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
                <Input
                  id='search'
                  placeholder='Search images...'
                  value={search}
                  onChange={(e) =>
                    handleFiltersChange(e.target.value, dateFilter)
                  }
                  className='pl-10'
                />
              </div>
              {search && (
                <Button
                  type='button'
                  onClick={() => handleFiltersChange('')}
                  variant={'secondary'}
                >
                  <X className='mr-2 h-4 w-4' /> Reset
                </Button>
              )}
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
              >
                <Image
                  src={image.url}
                  alt={image.name}
                  sizes='100vw'
                  className='object-cover'
                  fill
                />
                <div className='absolute left-0 bottom-0 w-full p-2 bg-black/50 opacity-100 group-hover:opacity-0 transition-opacity'>
                  <p className='truncate w-10/12 text-white text-xs'>
                    Name: {image?.name}
                  </p>
                  <p className='text-white text-xs'>
                    Folder: {image?.folder === '.' ? 'root' : image?.folder}
                  </p>
                  <p className='text-white text-xs'>
                    Size: {formatFileSize(image?.size || 0)}
                  </p>
                </div>
                <div className='space-x-2 absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
                  <Button
                    onClick={() => onSelectImage?.(image.url)}
                    variant='secondary'
                  >
                    <Check className='h-4 w-4 mr-1' />
                  </Button>
                  <Button
                    onClick={() => {
                      setSelectedFile(image.key);
                      setOpen(true);
                    }}
                    variant='destructive'
                  >
                    <Trash className='h-4 w-4 mr-1' />
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
      <DeleteAlertModal
        open={open}
        setOpen={setOpen}
        description={`If you delete this file,it will be permanently deleted.`}
        onSubmit={async () => {
          try {
            if (!selectedFile) return;
            await mediasService.deleteMedias([selectedFile]);
            toast.success('Folder deleted successfully');
            setSelectedFile(null);
            refetch();
            setOpen(false);
          } catch (error) {
            const message =
              error instanceof Error ? error.message : 'Failed to delete';
            toast.error(message);
          }
        }}
      />
    </>
  );
}
