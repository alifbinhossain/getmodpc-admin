import React from 'react';

import { cn } from '@/lib/utils';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';

type Props = {
  className?: string;
  title: string;
  value: string;
  children: React.ReactNode;
};
function AccordionContainer({ title, value, className, children }: Props) {
  return (
    <Accordion
      type='single'
      collapsible
      defaultValue={value}
      className={cn('w-full border', className)}
    >
      <AccordionItem value={value}>
        <div className='border-b'>
          <AccordionTrigger className='rounded-none px-4 py-1 font-semibold!'>
            {title}
          </AccordionTrigger>
        </div>
        <AccordionContent className='h-auto p-4'>{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default AccordionContainer;
