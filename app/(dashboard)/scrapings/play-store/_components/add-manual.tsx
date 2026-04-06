import React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { useGetPlayStoreAppByUrl } from '../../_config/scraping.hooks';

function AddManual() {
  const [url, setUrl] = React.useState('');
  const { data, isPending, mutateAsync } = useGetPlayStoreAppByUrl();
  console.log(data);

  return (
    <>
      <div className='border rounded-md p-2 flex items-center justify-between focus-within:ring-2 gap-2'>
        <Input
          placeholder='Example: https://play.google.com/store/apps/details?id=com.example.app'
          className='focus-visible:ring-0 border-none'
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button
          disabled={isPending}
          onClick={() => {
            mutateAsync({ url });
            setUrl('');
          }}
          size={'lg'}
        >
          Get Now
        </Button>
      </div>
    </>
  );
}

export default AddManual;
