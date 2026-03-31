'use client';

import Image from 'next/image';

import { Check } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface GalleryTabProps {
  images: { url: string; id: string }[];
  onSelectImage?: (image: { url: string; id: string }) => void;
}

export function GalleryTab({ images, onSelectImage }: GalleryTabProps) {
  return (
    <div className='size-full'>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {images.map((image) => (
          <div
            key={image.id}
            className='relative group cursor-pointer border rounded-lg overflow-hidden hover:shadow-md transition-shadow'
            onClick={() => onSelectImage?.(image)}
          >
            <Image
              src={image.url}
              alt=''
              className='w-full h-32 object-cover'
              width={100}
              height={100}
            />
            <div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
              <Button size='sm' variant='secondary'>
                <Check className='h-4 w-4 mr-1' />
                Select
              </Button>
            </div>
          </div>
        ))}
      </div>
      {images.length === 0 && (
        <div className='flex justify-center items-center text-gray-500 h-full'>
          No images uploaded yet. Switch to Upload tab to add images.
        </div>
      )}
    </div>
  );
}
