import { EnumAppType } from '@/types/app';

import type { PlayStoreImportDebugData } from '@/app/(dashboard)/scrapings/play-store/_config/play-store-import';

import LatestByType from './latest-by-type';

type LatestGamesProps = {
  onImportComplete?: (debugData: PlayStoreImportDebugData) => void;
};

function LatestGames({ onImportComplete }: LatestGamesProps) {
  return (
    <LatestByType
      description='Browse the latest LiteApks game listings and import them directly.'
      onImportComplete={onImportComplete}
      title='Latest Games'
      type={EnumAppType.GAME}
    />
  );
}

export default LatestGames;
