'use client';
import React from 'react';

import Link from 'next/link';

import { ExternalLink, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { cn } from '@/lib/utils';

import AddManual from './add-manual';
import SearchResult from './search-result';

function Tabs() {
  const [isSearchTab, setIsSearchTab] = React.useState(false);
  return (
    <div className='space-y-5'>
      <div className='bg-gray-100 p-4 flex items-center gap-1'>
        <Button
          variant={'secondary'}
          className={cn(
            'hover:bg-gray-200 p-4 font-bold!',
            isSearchTab && 'text-red-500'
          )}
          onClick={() => setIsSearchTab(true)}
        >
          <Search /> Search
        </Button>
        <Button
          className={cn(
            'hover:bg-gray-200 p-4 font-bold!',
            !isSearchTab && 'text-red-500'
          )}
          variant={'secondary'}
          onClick={() => setIsSearchTab(false)}
        >
          <ExternalLink /> Add Manual
        </Button>
      </div>
      {isSearchTab ? (
        <>
          <div className='bg-gray-100 p-4 border'>
            <h2 className='text-lg font-bold uppercase'>Search</h2>
          </div>
          <p className='text-center text-sm text-muted-foreground'>
            Just add your <span className='font-bold'>keyword</span> on form and
            click <span className='font-bold'>Search</span>
          </p>
          <SearchResult />
        </>
      ) : (
        <>
          <div className='bg-gray-100 p-4 border'>
            <h2 className='text-lg font-bold uppercase flex items-center gap-2'>
              <ExternalLink /> <span>Paste your link post here</span>
            </h2>
          </div>
          <AddManual />
          <div className='bg-gray-100 p-4 border'>
            <h2 className='text-lg font-bold uppercase'>Add Manual</h2>
          </div>
          <div className='bg-gray-100 p-4 border uppercase text-muted-foreground text-sm'>
            <ol className='list-decimal space-y-1'>
              <li className='list-inside'>
                Open website Google PlayStore{' '}
                <Link
                  className='font-semibold text-red-500'
                  href='https://play.google.com/store/apps?device=phone'
                  target='_blank'
                >
                  games
                </Link>{' '}
                or{' '}
                <Link
                  className='font-semibold text-red-500'
                  href='https://play.google.com/store/apps?device=phone'
                  target='_blank'
                >
                  apps
                </Link>
              </li>
              <li className='list-inside'>Copy link post and paste to form</li>
              <li className='list-inside'>
                use the url into this format:
                <span className='font-semibold text-red-500 lowercase ml-1'>
                  https://play.google.com/store/apps/details?id=com.roblox.client
                </span>
              </li>
            </ol>
          </div>
        </>
      )}
    </div>
  );
}

export default Tabs;
