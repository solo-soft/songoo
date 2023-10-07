
type TNames = "artist" | "songs" | "related";

type TImages = Array<{
    height?: number;
    url: string;
    width?: number;
}>;
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
