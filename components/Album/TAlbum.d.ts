import {TNames} from "../TMainData";

export type TSpecificAlbums = {
  albums : {
    __typename: string
    artists: Array<{
      id: string;
      name: string;
    }>;
    copyrights : {
      text : string
      type : string
    }[]
    name : string
    total_tracks : number
    release_date : string
    label : string
    images : {
      url : string
      height : number
      width : number
    }[]
    tracks : {
      items : Array<{
        id: string;
        images?: null;
        name: string;
        release_date?: string;
        track_number?: number;
        preview_url: string | null;
        duration_ms: number;
        artists: Array<{
          id: string;
          name: string;
        }>;
        album: {
          images: Array<{
            height?: number;
            width?: number;
            url: string;
          }>;
        };
      }>
    }

  }
};
