import type { Metadata } from 'next';

import Ads from './_components/ads';
import { adsService } from './_config/ads.service';

export const metadata: Metadata = { title: 'Ads' };

export default async function AdsPage() {
  const response = await adsService.getAds();
  return <Ads initialData={response} />;
}
