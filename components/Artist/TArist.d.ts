type TNames = "artist" | "songs" | "related";

type TImages = Array<{
  height?: number;
  url: string;
  width?: number;
}>;

export type TRelated = {
  __typename: TNames;
  artists: Array<{
    id: string;
    images: TImages;
    name: string;
    uri: string;
  }>;
};

export type TArtist = {
  __typename?: TNames;
  id: string;
  images: TImages;
  name: string;
  popularity?: number;
};

export type TSongs = {
  __typename: TNames;
  tracks: Array<{
    id: string;
    name: string;
    duration_ms: number;
    preview_url: null | string;
    album: {
      id: string;
      images: TImages;
      name: string;
    };
    artists: Array<{
      id: string;
      name: string;
    }>;
  }>;
};

export type TAlbums = {
  id: string;
  images: TImages;
  name: string;
  release_date: string;
  artists: {
    id: string;
    name: string;
  }[];
  items: {
    artists: {
      id: string;
      name: string;
    }[];
    id: string;
    images: TImages;
    name: string;
    release_date: string;
  }[];
};

export type TArtistInfo = {
  artist: TArtist;
  songs: TSongs;
  related: TRelated;
  albums: TAlbums;
};
