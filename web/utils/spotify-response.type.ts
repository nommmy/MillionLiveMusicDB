type ExternalUrls = {
  spotify: string;
};

type Followers = {
  href: string;
  total: number;
};

type AddedBy = {
  external_urls: ExternalUrls;
  followers: Followers;
  href: string;
  id: string;
  type: string;
  uri: string;
};

type Restrictions = {
  reason: string;
};

type Images = {
  url: string;
  height: number;
  width: number;
};

export type Album = {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Images[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions: Restrictions;
  type: string;
  uri: string;
  artists: Artist[];
  tracks: Items;
};

type Items = {
  items: Track[]
}

type ExternalIds = {
  isrc: string;
  ean: string;
  upc: string;
};

type ExternalUrlsTrack = {
  spotify: string;
};

export type Track = {
  album: Album;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIds;
  external_urls: ExternalUrlsTrack;
  href: string;
  id: string;
  is_playable: boolean;
  linked_from: {};
  restrictions: Restrictions;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
};

export type Artist = {
  external_urls: ExternalUrls;
  followers: Followers;
  genres: string[];
  href: string;
  id: string;
  images: Images[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
};

export type Item = {
  added_at: string;
  added_by: AddedBy;
  is_local: boolean;
  track: Track;
};

export type AudioFeatures = {
  acousticness: number;
  analysis_url: string;
  danceability: number;
  duration_ms: number;
  energy: number;
  id: string;
  instrumentalness: number;
  key: number;
  liveness: number;
  loudness: number;
  mode: number;
  speechiness: number;
  tempo: number;
  time_signature: number;
  track_href: string;
  type: string;
  uri: string;
  valence: number;
};
