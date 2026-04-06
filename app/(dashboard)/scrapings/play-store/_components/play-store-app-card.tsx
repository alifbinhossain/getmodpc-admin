import Image from 'next/image';
import Link from 'next/link';

import { ExternalLink, Star } from 'lucide-react';

import { Button } from '@/components/ui/button';

type PlayStoreCardApp = {
  appId: string;
  developer: string;
  icon: string;
  scoreText: string;
  summary?: string;
  title: string;
  url: string;
};

type PlayStoreAppCardProps = {
  actionLabel?: string;
  app: PlayStoreCardApp;
};

function PlayStoreAppCard({
  actionLabel = 'View on Play Store',
  app,
}: PlayStoreAppCardProps) {
  return (
    <article className='flex flex-col justify-between gap-4 rounded-md border bg-background p-4 shadow-xs sm:flex-row sm:items-center'>
      <div className='flex flex-1 gap-3'>
        <div className='relative size-14 shrink-0 overflow-hidden rounded-md border bg-muted'>
          <Image
            src={app.icon}
            alt={app.title}
            className='object-cover'
            fill
            sizes='56px'
          />
        </div>
        <div className='space-y-2'>
          <div>
            <p className='font-semibold text-foreground'>{app.title}</p>
            <p className='text-sm text-muted-foreground'>
              Developer: {app.developer}
            </p>
          </div>
          {app.summary ? (
            <p className='line-clamp-2 text-sm text-muted-foreground'>
              {app.summary}
            </p>
          ) : null}
        </div>
      </div>
      <div className='flex items-center justify-between gap-3 sm:flex-col sm:items-end'>
        <p className='flex items-center gap-1 text-xs text-muted-foreground'>
          <Star className='size-3.5 text-yellow-500' />
          <span>{app.scoreText}</span>
        </p>
        <Button asChild size='sm'>
          <Link href={app.url} target='_blank' rel='noreferrer'>
            <ExternalLink />
            {actionLabel}
          </Link>
        </Button>
      </div>
    </article>
  );
}

export default PlayStoreAppCard;
