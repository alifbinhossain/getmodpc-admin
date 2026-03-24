// Server Component — pure display, no interactivity.

interface DataTableHeaderProps {
  title: string;
  description?: string;
}

export function DataTableHeader({ title, description }: DataTableHeaderProps) {
  return (
    <div className='mb-4'>
      <h2 className='text-xl font-semibold tracking-tight text-foreground'>
        {title}
      </h2>
      {description && (
        <p className='mt-1 text-sm text-muted-foreground'>{description}</p>
      )}
    </div>
  );
}
