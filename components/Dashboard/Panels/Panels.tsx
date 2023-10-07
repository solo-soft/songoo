import { HStack, Stack } from "@chakra-ui/react";
import useSWR from "swr";
import { useContext, useEffect } from "react";
import { CURRENT_SINGER } from "../../../recoil/atoms/atoms";
import { useRecoilState, useSetRecoilState } from "recoil";
import { TCurrentSinger } from "./TopTracks/TTopTrack";
import getUserDataOnSupabase from "../../../supabase/reads/getUserDataOnSupabase";
import Subscription from "./Subscription/Subscription";
import TopTenTrack from "./TopTracks/TopTenTrack";
import Playlists from "./Playlists/Playlists";
import RecentlyPlayed from "./RecentlyPlayed/RecentlyPlayed";
import Pinned from "./Pinned/Pinned";
import "swiper/css";
import "swiper/css/pagination";
import useFetchSwr from "../../../hooks/useFetchSwr";
import { TPinned } from "../TDashboard";
import { PinnedContext } from "../../../provider/PinnedProvider";
import { TRecentlyPlayed } from "./RecentlyPlayed/TRecentlyPlayed";
import { RecentlyPlayedContext } from "../../../provider/RecentlyProvider";

type TGeneralStyle = {
  flex: number | Array<number>;
  height: number | string | Array<number | string>;
  padding: number | Array<number>;
  rounded: number | Array<number>;
  bgColor?: string;
};

const generalStyle = (
  flexSize: number,
  heightSize: number | string | Array<number | string>,
  paddingSize: number | Array<number>,
  roundedSize: number | Array<number>,
  bgColor?: string
): TGeneralStyle => {
  return {
    flex: flexSize,
    height: heightSize,
    padding: paddingSize,
    rounded: roundedSize,
    bgColor: bgColor,
  };
};

const Panels = () => {
  const { data: session } = useSWR("/api/getUserSession");

  const setCurrentSinger = useSetRecoilState<TCurrentSinger>(CURRENT_SINGER);
  const pinnedSongs: TPinned[] | undefined | null = useContext(
    PinnedContext
  );
  const recentlyPlayed: TRecentlyPlayed[] | undefined | null = useContext(
    RecentlyPlayedContext
  );

  const { swrFetcher } = useFetchSwr();

  const { data: subscriptions } = swrFetcher(
    "/supabase/reads/UserSubscriptions",
    () => getUserDataOnSupabase("UserSubscriptions", session),
    {
      keepPreviousData: false,
    }
  );

  useEffect(() => {
    setCurrentSinger({
      singerId: subscriptions?.[0]?.singer?.id,
      singerName: subscriptions?.[0]?.singer?.name,
    });
  }, [subscriptions]);

  return subscriptions && pinnedSongs && recentlyPlayed ? (
    <Stack w={"full"} overflow={"hidden"}>
      <Stack>
        <Subscription />
      </Stack>
      <Stack
        pb={[25, 25, 0]}
        direction={["column", "column", "column", "row"]}
        overflow={"hidden"}
      >
        <Stack {...generalStyle(3, "full", 2, [15, 15, 5], "#0e0e0e")}>
          <TopTenTrack />
        </Stack>
        <Stack {...generalStyle(2, "full", 2, [15, 15, 5], "#0e0e0e")}>
          <Pinned />
        </Stack>
        <Stack
          overflow={"auto"}
          {...generalStyle(2, "full", 2, [15, 15, 5], "#0e0e0e")}
        >
          <RecentlyPlayed />
          <Playlists />
        </Stack>
      </Stack>
    </Stack>
  ) : (
    <>Loading...</>
  );
};

export default Panels;
