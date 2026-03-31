'use client';

import { useCallback, useEffect, useState } from 'react';

import { Upload } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { useMedias } from '@/app/(dashboard)/medias/_config/medias.hooks';

import { MediaModal } from './media-modal';

interface MediaInputProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

export function MediaInput({
  value,
  onChange,
  placeholder = 'Select image',
}: MediaInputProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [dateFilter, setDateFilter] = useState<string | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [accumulatedImages, setAccumulatedImages] = useState<
    { url: string; id: string }[]
  >([]);

  const { data, isLoading, isFetching, refetch } = useMedias(
    {
      searchTerm: search,
      dateFilter,
      page: currentPage,
      limit: 1,
    },
    undefined,
    isModalOpen
  );

  // Accumulate images when data changes
  useEffect(() => {
    if (data?.data) {
      if (currentPage === 1) {
        setAccumulatedImages(data.data);
      } else {
        setAccumulatedImages((prev) => [...prev, ...data.data]);
      }
    }
  }, [data?.data, currentPage]);

  const handleSelectImage = (url: string) => {
    onChange?.(url);
    setIsModalOpen(false);
  };

  const handleFiltersChange = (newSearch: string, newDateFilter?: string) => {
    setSearch(newSearch);
    setDateFilter(newDateFilter);
    setCurrentPage(1); // Reset to first page when filters change
    setAccumulatedImages([]); // Clear accumulated images
  };

  const handleLoadMore = () => {
    if (data?.meta?.hasNextPage && !isFetching) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleUploadSuccess = useCallback(() => {
    setSearch('');
    setDateFilter(undefined);
    setCurrentPage(1);
    setAccumulatedImages([]);
    refetch();
  }, [refetch]);

  return (
    <>
      <div className='flex gap-2'>
        <Input
          value={value || ''}
          placeholder={placeholder}
          readOnly
          className='flex-1'
        />
        <Button
          type='button'
          variant='outline'
          onClick={() => setIsModalOpen(true)}
        >
          <Upload className='h-4 w-4 mr-2' />
          Upload
        </Button>
      </div>
      <MediaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectImage={handleSelectImage}
        galleryImages={accumulatedImages}
        galleryMeta={data?.meta}
        isLoadingGallery={isLoading || isFetching}
        onUploadSuccess={handleUploadSuccess}
        search={search}
        filterDate={dateFilter}
        onFiltersChange={handleFiltersChange}
        onLoadMore={handleLoadMore}
      />
    </>
  );
}
