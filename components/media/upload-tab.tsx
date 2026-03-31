'use client';

import { DragEvent, useCallback, useState } from 'react';

import Image from 'next/image';

import { Upload, X } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';

import { useUploadMedias } from '@/app/(dashboard)/medias/_config/medias.hooks';

interface UploadTabProps {
  onUploadSuccess?: () => void;
  onClose?: (isRefreshData?: boolean) => void;
}

const MAX_FILES = 15;

export function UploadTab({ onUploadSuccess, onClose }: UploadTabProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [dragOver, setDragOver] = useState(false);

  const uploadMutation = useUploadMedias();

  const validateFiles = useCallback(
    (newFiles: File[]) => {
      const imageFiles = newFiles.filter((file) =>
        file.type.startsWith('image/')
      );

      if (imageFiles.length !== newFiles.length) {
        toast.error('Only image files are allowed');
        return [];
      }

      if (files.length + imageFiles.length > MAX_FILES) {
        toast.error(`Maximum ${MAX_FILES} files allowed`);
        return [];
      }

      return imageFiles;
    },
    [files.length]
  );

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragOver(false);

      const droppedFiles = Array.from(e.dataTransfer.files);
      const validFiles = validateFiles(droppedFiles);

      setFiles((prev) => [...prev, ...validFiles]);
    },
    [validateFiles]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = Array.from(e.target.files || []);
      const validFiles = validateFiles(selectedFiles);

      setFiles((prev) => [...prev, ...validFiles]);
      // Reset input value to allow re-selecting the same file
      e.target.value = '';
    },
    [validateFiles]
  );

  const removeFile = useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const uploadFiles = useCallback(async () => {
    if (files.length === 0) return;

    const formData = new FormData();
    files.forEach((file) => formData.append('medias', file));

    try {
      await uploadMutation.mutateAsync(formData);
      setFiles([]);
      onUploadSuccess?.();
      onClose?.(true);
    } catch (error) {
      console.error('Upload error:', error);
    }
  }, [files, uploadMutation, onUploadSuccess, onClose]);

  return (
    <div className='space-y-4 size-full flex flex-col'>
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors flex-1 flex flex-col justify-center ${
          dragOver ? 'border-primary bg-primary/5' : 'border-gray-300'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className='space-y-4'>
          <Upload className='mx-auto h-12 w-12 text-gray-400' />
          <div>
            <p className='text-lg font-medium mb-2'>
              Drag and drop images here
            </p>
            <p className='text-gray-500 mb-4'>or</p>
            <label htmlFor='file-upload'>
              <Button variant='outline' asChild>
                <span>Select Images</span>
              </Button>
              <input
                id='file-upload'
                type='file'
                multiple
                accept='image/*'
                className='hidden'
                onChange={handleFileSelect}
              />
            </label>
            <p className='text-sm text-gray-500 mt-2'>
              Maximum {MAX_FILES} files • Only images allowed
            </p>
          </div>
        </div>
      </div>

      {files.length > 0 && (
        <div className='space-y-4 border-t pt-4'>
          <div className='flex items-center justify-between'>
            <h3 className='font-medium'>
              Selected Files ({files.length}/{MAX_FILES})
            </h3>
            <Button
              variant='ghost'
              size='sm'
              onClick={() => setFiles([])}
              disabled={uploadMutation.isPending}
            >
              Clear All
            </Button>
          </div>
          <div className='max-h-40 overflow-y-auto space-y-2'>
            {files.map((file, index) => (
              <div
                key={index}
                className='flex items-center justify-between p-2 bg-gray-50 rounded-lg'
              >
                <div className='flex items-center space-x-2 flex-1 min-w-0'>
                  <Image
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className='w-8 h-8 object-cover rounded flex-shrink-0'
                    width={32}
                    height={32}
                  />
                  <div className='flex-1 min-w-0'>
                    <p className='text-sm font-medium truncate'>{file.name}</p>
                    <p className='text-xs text-gray-500'>
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => removeFile(index)}
                  disabled={uploadMutation.isPending}
                  className='flex-shrink-0'
                >
                  <X className='h-4 w-4' />
                </Button>
              </div>
            ))}
          </div>
          <Button
            onClick={uploadFiles}
            disabled={uploadMutation.isPending}
            className='w-full'
          >
            {uploadMutation.isPending
              ? 'Uploading...'
              : `Upload ${files.length} File${files.length > 1 ? 's' : ''}`}
          </Button>
        </div>
      )}
    </div>
  );
}
