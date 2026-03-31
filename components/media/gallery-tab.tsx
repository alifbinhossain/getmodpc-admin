import { useState } from 'react';

import Image from 'next/image';

import { Check, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { generateMonthsFromStart } from '@/lib/utils';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface GalleryTabProps {
  images: { url: string; id: string }[];
  onSelectImage?: (url: string) => void;
  search?: string;
  filterDate?: string;
  onFiltersChange?: (search: string, filterDate?: string) => void;
}

export function GalleryTab({
  images,
  onSelectImage,
  search = '',
  filterDate = '',
  onFiltersChange,
}: GalleryTabProps) {
  const [localSearch, setLocalSearch] = useState(search);
  const [localDate, setLocalEndDate] = useState<string | undefined>(filterDate);

  const handleSearchChange = (value: string) => {
    setLocalSearch(value);
    onFiltersChange?.(value, localDate);
  };

  const handleFilterDateChange = (value: string | undefined) => {
    setLocalEndDate(value);
    onFiltersChange?.(localSearch, value);
  };

  return (
    <div className='size-full space-y-4'>
      <div className='flex flex-col sm:flex-row sm:justify-between gap-4 border-y py-4'>
        <div className='flex gap-2'>
          <div className='w-full space-y-2'>
            <Label>Filter Media</Label>
            <Select
              value={localDate ?? 'all'}
              onValueChange={(value) =>
                handleFilterDateChange(value === 'all' ? undefined : value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder='Select month' />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value='all'>All Dates</SelectItem>

                {generateMonthsFromStart('2026-1')
                  .filter((m) => m.value !== undefined)
                  .map((month) => (
                    <SelectItem key={month.value} value={month.value!}>
                      {month.label}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className='space-y-2'>
          <Label htmlFor='search'>Search</Label>
          <div className='relative'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
            <Input
              id='search'
              placeholder='Search images...'
              value={localSearch}
              onChange={(e) => handleSearchChange(e.target.value)}
              className='pl-10'
            />
          </div>
        </div>
      </div>
      <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4 overflow-auto flex-1'>
        {images.map((image) => (
          <div
            key={image.id}
            className='relative aspect-square group cursor-pointer border rounded-lg overflow-hidden hover:shadow-md transition-shadow'
            onClick={() => onSelectImage?.(image.url)}
          >
            <Image src={image.url} alt='' className='object-cover' fill />
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
          No images found. Try adjusting your filters.
        </div>
      )}
    </div>
  );
}
