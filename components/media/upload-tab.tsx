'use client';

import { DragEvent, useCallback, useState } from 'react';

import { Upload, X } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';

interface UploadTabProps {
  onUploadSuccess?: () => void;
}

export function UploadTab({ onUploadSuccess }: UploadTabProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

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
      const imageFiles = droppedFiles.filter((file) =>
        file.type.startsWith('image/')
      );

      if (imageFiles.length !== droppedFiles.length) {
        toast.error('Only image files are allowed');
        return;
      }

      if (files.length + imageFiles.length > 15) {
        toast.error('Maximum 15 files allowed');
        return;
      }

      setFiles((prev) => [...prev, ...imageFiles]);
    },
    [files]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = Array.from(e.target.files || []);
      const imageFiles = selectedFiles.filter((file) =>
        file.type.startsWith('image/')
      );

      if (imageFiles.length !== selectedFiles.length) {
        toast.error('Only image files are allowed');
        return;
      }

      if (files.length + imageFiles.length > 15) {
        toast.error('Maximum 15 files allowed');
        return;
      }

      setFiles((prev) => [...prev, ...imageFiles]);
    },
    [files]
  );

  const removeFile = useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const uploadFiles = useCallback(async () => {
    if (files.length === 0) return;

    setUploading(true);

    try {
      const formData = new FormData();
      files.forEach((file) => formData.append('files', file));

      // Replace with actual upload API call
      const response = await fetch('/api/media/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      toast.success('Files uploaded successfully');
      setFiles([]);
      onUploadSuccess?.();
    } catch (error) {
      toast.error('Upload failed');
      console.error(error);
    } finally {
      setUploading(false);
    }
  }, [files, onUploadSuccess]);

  return (
    <div className='space-y-4 size-full'>
      <div
        className={`border-2 flex justify-center items-center border-dashed rounded-lg p-8 text-center transition-colors size-full ${
          dragOver ? 'border-primary bg-primary/5' : 'border-gray-300'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div>
          <Upload className='mx-auto h-12 w-12 text-gray-400 mb-4' />
          <p className='text-lg font-medium mb-2'>Drag and drop images here</p>
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
          <p className='text-sm text-gray-500 mt-2'>Maximum 15 files</p>
        </div>
      </div>

      {files.length > 0 && (
        <div className='space-y-2'>
          <h3 className='font-medium'>Selected Files ({files.length}/15)</h3>
          <div className='max-h-40 overflow-y-auto space-y-2'>
            {files.map((file, index) => (
              <div
                key={index}
                className='flex items-center justify-between p-2 bg-gray-50 rounded'
              >
                <div className='flex items-center space-x-2'>
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className='w-8 h-8 object-cover rounded'
                  />
                  <span className='text-sm truncate'>{file.name}</span>
                </div>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => removeFile(index)}
                  disabled={uploading}
                >
                  <X className='h-4 w-4' />
                </Button>
              </div>
            ))}
          </div>
          <Button onClick={uploadFiles} disabled={uploading} className='w-full'>
            {uploading ? 'Uploading...' : 'Upload Files'}
          </Button>
        </div>
      )}
    </div>
  );
}
