import React from 'react';

import Tabs from './_components/tabs';

function PlayStorePage() {
  return (
    <div className='space-y-5'>
      <div className='bg-gray-100 p-4 border'>
        <h2 className='text-lg font-bold uppercase'>
          Add sources from play.google.com
        </h2>
      </div>
      <Tabs />
    </div>
  );
}

export default PlayStorePage;
