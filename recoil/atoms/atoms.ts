import { atom, RecoilState, SetRecoilState } from "recoil";
import { TCurrentSinger } from "../../components/Dashboard/Panels/TopTracks/TTopTrack";
import { TUserPlaylists } from "../../components/Dashboard/TDashboard";

type TPlayback = {
  arrayOfSongs: any[];
  indexOfSongs: number;
  idsOfSongs: undefined | string;
  isPlaying: boolean;
  audioRef: HTMLAudioElement | null;
  session: {};
};

export const SPOTIFY_TRACKS_ID_ATOM = atom({
  key: Math.random().toString(),
  default: undefined,
});

export const SELECT_GENRE = atom({
  key: Math.random().toString(),
  default: "pop",
});

export const ARTISTS_ID: RecoilState<string | undefined> = atom<
  string | undefined
>({
  key: Math.random().toString(),
  default: undefined,
});

export const ARTISTS_NAME: RecoilState<string | undefined> = atom<
  string | undefined
>({
  key: Math.random().toString(),
  default: undefined,
});

export const FEELS = atom({
  key: Math.random().toString(),
  default: "Pop",
});

export const STATUS: RecoilState<string> = atom<string>({
  key: Math.random().toString(),
  default: "idle",
});

//?For the user panel of the subscription section
export const CURRENT_SINGER: RecoilState<TCurrentSinger> = atom<TCurrentSinger>(
  {
    key: Math.random().toString(),
    default: {
      singerId: null,
      singerName: null,
    },
  }
);

//?Send the selected data to the create playlist modal
export const SELECTED_THE_SONG_BY_USER: RecoilState<TUserPlaylists | null> =
  atom<TUserPlaylists | null>({
    key: Math.random().toString(),
    default: null,
  });

export const PLAYBACK_INFORMATION: RecoilState<TPlayback> = atom<TPlayback>({
  key: Math.random().toString(),
  default: {
    arrayOfSongs: [],
    indexOfSongs: 0,
    idsOfSongs: undefined,
    isPlaying: false,
    audioRef: null,
    session: {},
  },
});

export const PLAYBACK_ELAPSED_TIME: RecoilState<number | undefined> = atom<
  number | undefined
>({
  key: Math.random().toString(),
  default: 0,
});

export const PLAYBACK_DURATION: RecoilState<number | undefined> = atom<
  number | undefined
>({
  key: Math.random().toString(),
  default: 0,
});

export const PLAYBACK_LOADING = atom({
  key: Math.random().toString(),
  default: false,
});

export const IS_OPEN_MODAL_CREATE_PLAYLIST = atom({
  key: Math.random().toString(),
  default: false,
});

export const ERROR_INFO = atom({
  key: Math.random().toString(),
  default: {
    isError: false,
    retry: false,
  },
});
