type TNames = "artist" | "songs" | "related";

type TImages = Array<{
  height?: number;
  url: string;
  width?: number;
}>;

export type TRelated = {
  __typename: TNames;
  artists: Array< {
    id: string;
    images: TImages;
    name: string;
    uri: string;
  }>
}

export type TArtist = {
  __typename?: TNames;
  id: string;
  images: TImages;
  name: string;
  popularity?: number;
}

export type TSongs = {
  __typename: TNames;
  tracks: Array<{
    id: string;
    images?: TImages;
    name: string;
    release_date?: string;
    track_number?: number;
    preview_url: string | null;
    duration_ms: number;
    song_info? : {}
    artists: Array<{
      id: string;
      name: string;
    }>;
    album?: {
      id : string
      images: Array<{
        height?: number;
        width?: number;
        url: string;
      }>;
    };
  }>;
}

export type TAlbums = {
  artists: Array<{
    id: string;
    name: string;
  }>;
  id: string;
  images: TImages;
  name: string;
  release_date: string;
}

export type TArtistInfo = {
  artist: TArtist;
  songs: TSongs
  related: TRelated;
  albums : TAlbums
};

export type TArtistId = {
  find : {
    __typename: string;
    artists: {
      items: Array<{
        id: string;
      }>;
    };
  }
}

