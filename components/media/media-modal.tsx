'use client';

import { useCallback, useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { GalleryTab } from './gallery-tab';
import UploadTab from './upload-tab';

interface MediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectImage?: (url: string) => void;
}

export function MediaModal({
  isOpen,
  onClose,
  onSelectImage,
}: MediaModalProps) {
  const [activeTab, setActiveTab] = useState('upload');
  const [search, setSearch] = useState('');
  const [dateFilter, setDateFilter] = useState<string | undefined>();

  const handleFiltersChange = useCallback(
    (newSearch: string, newDateFilter?: string) => {
      setSearch(newSearch);
      setDateFilter(newDateFilter);
    },
    []
  );

  const handleSelectImage = useCallback(
    (url: string) => {
      onSelectImage?.(url);
      onClose();
    },
    [onSelectImage, onClose]
  );

  const handleUploadSuccess = useCallback(() => {
    // Reset filters when new images are uploaded
    setSearch('');
    setDateFilter(undefined);
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[90vw] h-[90vh] overflow-hidden'>
        <div className='space-y-3 size-full'>
          <DialogHeader>
            <DialogTitle>Select Media</DialogTitle>
          </DialogHeader>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className='h-[calc(100%-1.7rem)]'
          >
            <TabsList className='flex gap-2'>
              <TabsTrigger value='upload' className='w-40'>
                Upload Files
              </TabsTrigger>
              <TabsTrigger value='gallery' className='w-40'>
                Gallery
              </TabsTrigger>
            </TabsList>
            <TabsContent value='upload' className='flex-1 overflow-auto'>
              <UploadTab
                onUploadSuccess={handleUploadSuccess}
                onClose={onClose}
              />
            </TabsContent>
            <TabsContent value='gallery' className='flex-1 overflow-auto'>
              <GalleryTab
                search={search}
                dateFilter={dateFilter}
                onFiltersChange={handleFiltersChange}
                onSelectImage={handleSelectImage}
              />
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
