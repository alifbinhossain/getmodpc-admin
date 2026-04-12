'use client';

import { useState } from 'react';

import Image from 'next/image';

import { ExternalLink, ImageIcon, Upload, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { Label } from '../ui/label';
import { MediaModal } from './media-modal';

interface MediaInputProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  showPreview?: boolean;
}

export function MediaInput({
  value,
  onChange,
  placeholder = 'Select image',
  label = 'Image URL',
  showPreview = true,
}: MediaInputProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const trimmedValue = value?.trim() ?? '';
  const hasValue = trimmedValue.length > 0;

  const handleSelectImage = (url: string) => {
    onChange?.(url);
    setIsModalOpen(false);
  };

  return (
    <>
      <div>
        {label && (
          <Label htmlFor='media-input' className='mb-4'>
            {label}
          </Label>
        )}
        <div className='flex gap-2'>
          <Input
            id='media-input' // Added id for accessibility
            value={value || ''}
            placeholder={placeholder}
            onChange={(e) => onChange?.(e.target.value)}
            className='flex-1 bg-background'
          />

          <Button
            type='button'
            variant='outline'
            onClick={() => setIsModalOpen(true)}
          >
            <Upload className='h-4 w-4 mr-2' />
            Upload
          </Button>

          {hasValue && (
            <Button
              type='button'
              variant='ghost'
              size='icon'
              onClick={() => onChange?.('')}
              aria-label='Clear selected media'
            >
              <X className='h-4 w-4' />
            </Button>
          )}
        </div>

        {showPreview && (
          <div className='mt-4 rounded-lg border bg-muted/30 p-3'>
            {hasValue ? (
              <div className='space-y-3'>
                <div className='overflow-hidden h-44 w-full  relative rounded-md border bg-background'>
                  <Image
                    src={trimmedValue}
                    alt={label}
                    className='object-contain'
                    fill
                  />
                </div>
                <div className='flex items-center gap-2'>
                  <Button type='button' variant='secondary' asChild>
                    <a href={trimmedValue} target='_blank' rel='noreferrer'>
                      <ExternalLink className='mr-2 h-4 w-4' />
                      Open Image
                    </a>
                  </Button>
                </div>
              </div>
            ) : (
              <div className='flex h-32 flex-col items-center justify-center rounded-md border border-dashed bg-background text-muted-foreground'>
                <ImageIcon className='mb-2 h-5 w-5' />
                <p className='text-sm'>No image selected</p>
              </div>
            )}
          </div>
        )}
      </div>
      <MediaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectImage={handleSelectImage}
      />
    </>
  );
}
