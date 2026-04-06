'use client';

import type { ReactNode } from 'react';

import { ExternalLink, Search } from 'lucide-react';

import {
  Tabs as BaseTabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

type TabsProps = {
  searchTab: ReactNode;
  manualTab: ReactNode;
};

function Tabs({ searchTab, manualTab }: TabsProps) {
  return (
    <BaseTabs defaultValue='manual' className='space-y-5'>
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
        </TabsList>
      </div>
      <TabsContent value='search' className='mt-0 space-y-5'>
        {searchTab}
      </TabsContent>
      <TabsContent value='manual' className='mt-0 space-y-5'>
        {manualTab}
      </TabsContent>
    </BaseTabs>
  );
}

export default Tabs;
