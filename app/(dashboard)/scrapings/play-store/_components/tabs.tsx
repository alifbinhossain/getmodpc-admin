'use client';

import { useState } from 'react';

import Link from 'next/link';

import { Bug, ExternalLink, Search } from 'lucide-react';

import {
  Tabs as BaseTabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

import type { PlayStoreImportDebugData } from '../_config/play-store-import';
import AddManual from './add-manual';
import DebugPanel from './debug-panel';
import SearchResult from './search-result';

function Tabs() {
  const [activeTab, setActiveTab] = useState('manual');
  const [debugData, setDebugData] = useState<PlayStoreImportDebugData | null>(
    null
  );
  const handleImportComplete = (payload: PlayStoreImportDebugData) => {
    setDebugData(payload);
    setActiveTab('debugs');
  };

  return (
    <BaseTabs
      value={activeTab}
      onValueChange={setActiveTab}
      className='space-y-5'
    >
      <div className='bg-gray-100 p-4 flex items-center gap-1'>
        <TabsList className='h-auto gap-1 bg-transparent p-0'>
          <TabsTrigger
            value='search'
            className='border bg-background px-4 py-2 font-bold data-active:text-red-500'
          >
            <Search />
            Search
          </TabsTrigger>
          <TabsTrigger
            value='manual'
            className='border bg-background px-4 py-2 font-bold data-active:text-red-500'
          >
            <ExternalLink />
            Add Manual
          </TabsTrigger>
          {debugData && (
            <TabsTrigger
              value='debugs'
              className='border bg-background px-4 py-2 font-bold data-active:text-red-500'
            >
              <Bug />
              Debugs
            </TabsTrigger>
          )}
        </TabsList>
      </div>
      <TabsContent forceMount value='search' className='mt-0 space-y-5'>
        <div className='bg-gray-100 p-4 border'>
          <h2 className='text-lg font-bold uppercase'>Search</h2>
        </div>
        <p className='text-center text-sm text-muted-foreground'>
          Just add your <span className='font-bold'>keyword</span> on form and
          click <span className='font-bold'>Search</span>
        </p>
        <SearchResult onImportComplete={handleImportComplete} />
      </TabsContent>
      <TabsContent forceMount value='manual' className='mt-0 space-y-5'>
        <div className='bg-gray-100 p-4 border'>
          <h2 className='text-lg font-bold uppercase flex items-center gap-2'>
            <ExternalLink className='size-4' />
            <span>Paste your link post here</span>
          </h2>
        </div>
        <AddManual onImportComplete={handleImportComplete} />
        <div className='bg-gray-100 p-4 border'>
          <h2 className='text-lg font-bold uppercase'>Add Manual</h2>
        </div>
        <div className='bg-gray-100 p-4 border uppercase text-muted-foreground text-sm'>
          <ol className='list-decimal space-y-1'>
            <li className='list-inside'>
              Open website Google PlayStore{' '}
              <Link
                className='font-semibold text-red-500'
                href='https://play.google.com/store/games?device=phone'
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
      </TabsContent>
      <TabsContent forceMount value='debugs' className='mt-0 space-y-5'>
        <DebugPanel debugData={debugData} />
      </TabsContent>
    </BaseTabs>
  );
}

export default Tabs;
