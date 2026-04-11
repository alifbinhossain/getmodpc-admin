import {
  BaseQueryParams,
  BaseRecord,
  EnumAppCommentStatus,
  EnumPlatformType,
} from '.';

export enum EnumAppStatus {
  PUBLISH = 'publish',
  DRAFT = 'draft',
}
export enum EnumAppType {
  APP = 'app',
  GAME = 'game',
}
export enum EnumAppSource {
  PLAY_STORE = 'play_store',
  LITE_APKS = 'lite_apks',
}

export interface AppLink {
  name: string;
  link: string;
  type?: string;
  size?: string;
  note?: string;
}

export interface AppModder {
  title?: string | null;
  descriptions?: string | null;
}

export interface IAppTags {
  id: string;
  name: string;
  slug: string;
}

export interface AppBody {
  name: string;
  title?: string | null;
  platform?: EnumPlatformType;
  type?: EnumAppType;
  source: EnumAppSource;
  description: string;
  summary?: string | null;
  latest_news?: string | null;
  header_image?: string | null;
  icon?: string | null;
  genre?: string | null;
  youtube_id?: string | null;
  os_version?: string | null;
  screenshots?: string[];
  developer?: string;
  app_tags?: string[];
  app_developers?: string[];
  version?: string | null;
  latest_version?: string | null;
  show_in_slider?: boolean;
  updated?: string | null;
  status?: EnumAppStatus;
  comment_status?: EnumAppCommentStatus;
  categories?: IAppTags[];
  tags?: IAppTags[];
  url: string;
  package_name?: string | null;
  installs: string;
  score_text: string;
  ratings?: number;
  reviews?: number;
  published_date?: string | null;
  size?: string;
  is_verified?: boolean;
  short_mode?: string;
  links?: AppLink[];
  modders?: AppModder[];
  last_version_checked_at?: string | null;
}

export interface CreateAppPayload extends Omit<
  AppBody,
  'categories' | 'tags' | 'last_version_checked_at' | 'published_date'
> {
  categories?: string[];
  tags?: string[];
}

export interface UpdateAppPayload extends Partial<CreateAppPayload> {
  id: string;
}

export interface AppRecord extends BaseRecord, Partial<AppBody> {
  slug?: string;
  body?: Partial<AppBody>;
}

export interface AppQueryParams extends BaseQueryParams {
  name?: string;
  source?: EnumAppSource;
  status?: EnumAppStatus;
  platform?: EnumPlatformType;
  type?: EnumAppType;
}

export interface UpdatedAppRecord {
  id: string;
  name: string;
  slug: string;
  icon: string;
  version: string;
  latest_version: string;
}
