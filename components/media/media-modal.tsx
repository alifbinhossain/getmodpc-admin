'use client';

import { useState } from 'react';

import { PaginationMeta } from '@/types';
import type { MediaRecord } from '@/types/media';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { GalleryTab } from './gallery-tab';
import { UploadTab } from './upload-tab';

interface MediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectImage?: (url: string) => void;
  galleryImages?: MediaRecord[];
  galleryMeta?: PaginationMeta;
  isLoadingGallery?: boolean;
  onUploadSuccess?: () => void;
  search?: string;
  filterDate?: string;
  onFiltersChange?: (search: string, filterDate?: string) => void;
  onLoadMore?: () => void;
}

export function MediaModal({
  isOpen,
  onClose,
  onSelectImage,
  galleryImages = [],
  galleryMeta,
  isLoadingGallery = false,
  onUploadSuccess,
  search = '',
  filterDate = '',
  onFiltersChange,
  onLoadMore,
}: MediaModalProps) {
  const [activeTab, setActiveTab] = useState('upload');

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
              <UploadTab onUploadSuccess={onUploadSuccess} onClose={onClose} />
            </TabsContent>
            <TabsContent value='gallery' className='flex-1 overflow-auto'>
              <GalleryTab
                images={galleryImages}
                meta={galleryMeta}
                isLoading={isLoadingGallery}
                onSelectImage={onSelectImage}
                search={search}
                filterDate={filterDate}
                onFiltersChange={onFiltersChange}
                onLoadMore={onLoadMore}
              />
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
