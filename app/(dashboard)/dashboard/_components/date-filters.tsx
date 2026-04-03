'use client';

import { useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function DateFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [startDate, setStartDate] = useState(
    searchParams.get('startDate') || ''
  );
  const [endDate, setEndDate] = useState(searchParams.get('endDate') || '');

  const handleFilter = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (startDate) params.set('startDate', startDate);
    else params.delete('startDate');
    if (endDate) params.set('endDate', endDate);
    else params.delete('endDate');
    router.push(`?${params.toString()}`);
  };

  const handleClear = () => {
    setStartDate('');
    setEndDate('');
    const params = new URLSearchParams(searchParams.toString());
    params.delete('startDate');
    params.delete('endDate');
    router.push(`?${params.toString()}`);
  };

  return (
    <div className='flex flex-col sm:flex-row gap-4 items-end mb-6'>
      <div className='flex flex-col gap-2'>
        <Label htmlFor='startDate'>Start Date</Label>
        <Input
          id='startDate'
          type='date'
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div className='flex flex-col gap-2'>
        <Label htmlFor='endDate'>End Date</Label>
        <Input
          id='endDate'
          type='date'
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <Button onClick={handleFilter}>Filter</Button>
      {(startDate || endDate) && (
        <Button variant='outline' onClick={handleClear}>
          Clear
        </Button>
      )}
    </div>
  );
}
