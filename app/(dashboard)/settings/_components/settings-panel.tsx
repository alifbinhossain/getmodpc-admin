import type { ReactNode } from 'react';

type SettingsPanelProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export function SettingsPanel({
  title,
  description,
  children,
}: SettingsPanelProps) {
  return (
    <div className='rounded-xl border bg-card p-5 shadow-sm'>
      <div className='mb-5 space-y-1'>
        <h2 className='text-base font-semibold'>{title}</h2>
        <p className='text-sm text-muted-foreground'>{description}</p>
      </div>
      {children}
    </div>
  );
}
