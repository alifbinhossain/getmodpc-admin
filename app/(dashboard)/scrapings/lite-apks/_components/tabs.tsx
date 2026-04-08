'use client';

import { useState } from 'react';

import Link from 'next/link';

import { ILiteApksApp } from '@/types/scrapping';
import { Bug, ExternalLink, Gamepad2, Smartphone } from 'lucide-react';

import {
  Tabs as BaseTabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

import type { PlayStoreImportDebugData } from '@/app/(dashboard)/scrapings/_config/scraping-import';
import DebugPanel from '@/app/(dashboard)/scrapings/play-store/_components/debug-panel';

import AddManual from './add-manual';
import LatestApps from './latest-apps';
import LatestGames from './latest-games';

function Tabs() {
  const [activeTab, setActiveTab] = useState('latest-apps');
  const [debugData, setDebugData] =
    useState<PlayStoreImportDebugData<ILiteApksApp> | null>(null);

  const handleImportComplete = (
    payload: PlayStoreImportDebugData<ILiteApksApp>
  ) => {
    setDebugData(payload);

    if (payload.status !== 'error') {
      setActiveTab('debugs');
    }
  };

  return (
    <BaseTabs
      value={activeTab}
      onValueChange={setActiveTab}
      className='space-y-5'
    >
      <div className='bg-gray-100 flex items-center gap-1 p-4'>
        <TabsList className='h-auto gap-1 bg-transparent p-0'>
          <TabsTrigger
            value='latest-apps'
            className='border bg-background px-4 py-2 font-bold data-active:text-red-500'
          >
            <Smartphone />
            Latest App
          </TabsTrigger>
          <TabsTrigger
            value='latest-games'
            className='border bg-background px-4 py-2 font-bold data-active:text-red-500'
          >
            <Gamepad2 />
            Latest Game
          </TabsTrigger>
          <TabsTrigger
            value='manual'
            className='border bg-background px-4 py-2 font-bold data-active:text-red-500'
          >
            <ExternalLink />
            Add Manual
          </TabsTrigger>
          {debugData ? (
            <TabsTrigger
              value='debugs'
              className='border bg-background px-4 py-2 font-bold data-active:text-red-500'
            >
              <Bug />
              Debugs
            </TabsTrigger>
          ) : null}
        </TabsList>
      </div>

      <TabsContent forceMount value='latest-apps' className='mt-0 space-y-5'>
        <LatestApps onImportComplete={handleImportComplete} />
      </TabsContent>

      <TabsContent forceMount value='latest-games' className='mt-0 space-y-5'>
        <LatestGames onImportComplete={handleImportComplete} />
      </TabsContent>

      <TabsContent forceMount value='manual' className='mt-0 space-y-5'>
        <div className='bg-gray-100 p-4 border'>
          <h2 className='text-lg font-bold uppercase flex items-center gap-2'>
            <ExternalLink className='size-4' />
            <span>Paste your LiteApks link here</span>
          </h2>
        </div>
        <AddManual onImportComplete={handleImportComplete} />
        <div className='bg-gray-100 p-4 border'>
          <h2 className='text-lg font-bold uppercase'>Add Manual</h2>
        </div>
        <div className='bg-gray-100 p-4 border uppercase text-muted-foreground text-sm'>
          <ol className='list-decimal space-y-1'>
            <li className='list-inside'>
              Open the LiteApks website{' '}
              <Link
                className='font-semibold text-red-500'
                href='https://liteapks.com/'
                target='_blank'
              >
                liteapks.com
              </Link>
            </li>
            <li className='list-inside'>
              Copy an app detail URL and paste it into the form
            </li>
            <li className='list-inside'>
              Submit the form to fetch and import that LiteApks record
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
