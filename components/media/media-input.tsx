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

  const { data, isLoading, isFetching, refetch } = useMedias(
    {
      searchTerm: search,
      dateFilter,
    },
    undefined,
    isModalOpen
  );

  const handleSelectImage = (url: string) => {
    onChange?.(url);
    setIsModalOpen(false);
  };

  const handleFiltersChange = (newSearch: string, newDateFilter?: string) => {
    setSearch(newSearch);
    setDateFilter(newDateFilter);
  };

  const handleUploadSuccess = useCallback(() => {
    setSearch('');
    setDateFilter(undefined);
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
        galleryImages={data?.data || []}
        onUploadSuccess={handleUploadSuccess}
        search={search}
        filterDate={dateFilter}
        onFiltersChange={handleFiltersChange}
      />
    </>
  );
}
