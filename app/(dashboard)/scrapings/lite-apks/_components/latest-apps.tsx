import { EnumAppType } from '@/types/app';
import { ILiteApksApp } from '@/types/scrapping';

import type { PlayStoreImportDebugData } from '@/app/(dashboard)/scrapings/_config/scraping-import';

import LatestByType from './latest-by-type';

type LatestAppsProps = {
  onImportComplete?: (
    debugData: PlayStoreImportDebugData<ILiteApksApp>
  ) => void;
};

function LatestApps({ onImportComplete }: LatestAppsProps) {
  return (
    <LatestByType
      description='Browse the latest LiteApks app listings and import them directly.'
      onImportComplete={onImportComplete}
      title='Latest Apps'
      type={EnumAppType.APP}
    />
  );
}

export default LatestApps;
