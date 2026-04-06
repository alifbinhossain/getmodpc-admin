import Link from 'next/link';

import { ExternalLink } from 'lucide-react';

import AddManual from './add-manual';

function ManualPanel() {
  return (
    <>
      <div className='bg-gray-100 p-4 border'>
        <h2 className='text-lg font-bold uppercase flex items-center gap-2'>
          <ExternalLink className='size-4' />
          <span>Paste your link post here</span>
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
    </>
  );
}

export default ManualPanel;
