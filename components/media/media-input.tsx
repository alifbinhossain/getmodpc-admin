'use client';

import { useState } from 'react';

import { Upload } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { Label } from '../ui/label';
import { MediaModal } from './media-modal';

interface MediaInputProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
}

export function MediaInput({
  value,
  onChange,
  placeholder = 'Select image',
  label = 'Image URL',
}: MediaInputProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      </div>
      <MediaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectImage={handleSelectImage}
      />
    </>
  );
}
