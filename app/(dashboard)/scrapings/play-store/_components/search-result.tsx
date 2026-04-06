import React from 'react';

import Image from 'next/image';

import { Star } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { useGetSearchPlayStoreApp } from '../../_config/scraping.hooks';

function SearchResult() {
  const [search, setSearch] = React.useState('');
  const [params, setParams] = React.useState('');
  const handleSearch = () => {
    if (search.trim()) {
      setParams(search);
      setSearch('');
    }
  };
  const { data, isLoading, isFetching } = useGetSearchPlayStoreApp(
    {
      appName: params,
    },
    params !== ''
  );

  return (
    <div className='space-y-5'>
      <div className='border rounded-md p-2 flex items-center justify-between focus-within:ring-2 gap-2'>
        <Input
          placeholder='Example: whatsapp'
          className='focus-visible:ring-0 border-none'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button onClick={handleSearch} size={'lg'}>
          Search
        </Button>
      </div>

      {isLoading || isFetching ? (
        <div className='mt-4 bg-gray-100 p-4 border'>
          <h2 className='text-lg font-bold uppercase'>Loading...</h2>
        </div>
      ) : (
        <>
          {(data?.data ?? [])?.length > 0 && (
            <div>
              <div className='bg-gray-100 p-4 rounded-md'>
                <h2 className='text-lg font-bold uppercase'>Result</h2>
              </div>
              <div className='grid sm:grid-cols-2 gap-4'>
                {(data?.data ?? []).map((app) => (
                  <div
                    key={app.appId}
                    className='flex justify-between gap-1 p-3 rounded-md'
                  >
                    <div className='flex-1 flex gap-3 items-center'>
                      <div className='size-14 relative rounded-md overflow-hidden'>
                        <Image
                          src={app.icon}
                          alt={app.title}
                          className='object-cover'
                          fill
                        />
                      </div>
                      <div className='space-y-2'>
                        <p>{app.title}</p>
                        <p className='text-sm text-muted-foreground'>
                          Devs: {app.developer}
                        </p>
                      </div>
                    </div>
                    <div className='flex flex-col gap-2 justify-center items-center'>
                      <Button>Get Now</Button>
                      <p className='text-xs flex items-center gap-1'>
                        <Star className='text-yellow-500' size={12} />{' '}
                        <span>{app.scoreText}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default SearchResult;
