'use client';

import { useCallback, useEffect, useState } from 'react';

import { Upload } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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
  const [galleryImages, setGalleryImages] = useState<
    { url: string; id: string }[]
  >([]);

  const fetchGalleryImages = useCallback(async () => {
    try {
      const response = await fetch('/api/media/images');
      if (response.ok) {
        const data = await response.json();
        setGalleryImages(data.images);
      }
    } catch (error) {
      console.error('Failed to fetch gallery images:', error);
    }
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchGalleryImages();
    }
  }, [isModalOpen, fetchGalleryImages]);

  const handleSelectImage = (image: { url: string; id: string }) => {
    onChange?.(image.url);
    setIsModalOpen(false);
  };

  const handleUploadSuccess = () => {
    fetchGalleryImages();
  };

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
        galleryImages={galleryImages}
        onUploadSuccess={handleUploadSuccess}
      />
    </>
  );
}
