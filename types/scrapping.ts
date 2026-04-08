import { BaseQueryParams } from '.';
import { EnumAppType } from './app';

export type ISearchAppRecord = {
  title: string;
  appId: string;
  url: string;
  icon: string;
  developer: string;
  developerId: string;
  price: number | null;
  free: boolean;
  summary: string;
  scoreText: string;
  score: number;
};

export interface IScrapingQueryParams extends BaseQueryParams {
  appName?: string;
}

export interface ILiteApksScrapingQueryParams {
  page?: number;
  type?: EnumAppType;
}

type Histogram = {
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
};

export type Category = {
  name: string;
  id: string;
};

export type IPlayStoreScrapingApp = {
  id: string;
  title: string;
  description: string;
  descriptionHTML: string;
  summary: string;

  installs: string;
  minInstalls: number;
  maxInstalls: number;

  score: number;
  scoreText: string;
  ratings: number;
  reviews: number;
  histogram: Histogram;

  price: number | null;
  free: boolean;
  currency: string;
  priceText: string;

  available: boolean;
  offersIAP: boolean;
  IAPRange: string;

  androidVersion: string;
  androidVersionText: string;
  androidMaxVersion: string;

  developer: string;
  developerId: string;
  developerEmail: string;
  developerWebsite: string;

  developerLegalName: string;
  developerLegalEmail: string;
  developerLegalAddress: string;
  developerLegalPhoneNumber: string;

  privacyPolicy: string;
  developerInternalID: string;

  genre: string;
  genreId: string;
  categories: Category[];

  icon: string;
  headerImage: string;
  screenshots: string[];

  contentRating: string;
  adSupported: boolean;

  released: string;
  updated: number;
  updated_text: string;
  version: string;

  recentChanges: string;
  comments: any[];

  preregister: boolean;
  earlyAccessEnabled: boolean;
  isAvailableInPlayPass: boolean;

  appId: string;
  url: string;
  size: string;

  source: string;
};

export type ILiteApkTypeAppItem = {
  title: string;
  scoreText: string;
  shortMode: string;
  link: string;
  icon: string;
};

export type ILiteApksApp = {
  title: string | null;
  icon: string | null;
  headerImage: string | null;
  developer: string | null;
  version: string | null;
  size: string | null;
  ratings: number;
  recentChanges: string;
  summary: string;
  shortMode: string | null;
  description: string;
  descriptionHtml: string | null;
  screenshots: string[];
  scoreText: string | null;
  installs: string | null;
  genre: string | null;
  genreId: string | null;
  categories: Category[];
  reviews: number;
  url: string;
  updated_text: string | null;
  source: 'lite_apks';
};
