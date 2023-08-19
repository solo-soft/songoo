import { Divider, HStack, Stack, Text, VStack } from "@chakra-ui/react";
import useSWR from "swr";
import React, { useEffect } from "react";
import { CURRENT_SINGER } from "../../recoil/atoms/atoms";
import { useSetRecoilState } from "recoil";
import getUserDataOnSupabase from "../../supabase/reads/getUserDataOnSupabase";
import Subscription from "./Subscription/Subscription";
import TopTenTrack from "./TopTenTracks/TopTenTrack";
import Playlists from "./Playlists/Playlists";
import RecentlyPlayed from "./RecentlyPlayed/RecentlyPlayed";
import { TSession } from "../Type";
import { TRecentlyPlayed, TSubscriptions } from "./Type";
import { TCurrentSinger } from "../../recoil/atoms/Type";
import "swiper/css";
import "swiper/css/pagination";
import CreatePlaylist from "../CreatePlaylist/CreatePlaylist";
import Pinned from "./Pinned/Pinned";

import { useRouter } from "next/router";


const parentStyles = (flex: number, bgColor: string) => {
  return {
    flex,
    p: 2,
    h: "full",
    rounded: 5,
    bgGradient: `linear(to-b, ${bgColor} , black)`,
  };
};

const Index = () => {
  const router = useRouter();
  const { data: session }: { data: TSession | undefined } = useSWR(
    "/api/getUserSession"
  );

  const setCurrentSinger = useSetRecoilState<TCurrentSinger | {}>(
    CURRENT_SINGER
  );

  const {
    data: subscriptions,
    error: subscriptionError,
  }: { data: Array<TSubscriptions> | undefined; error: string | undefined } =
    useSWR("/supabase/reads/UserSubscriptions", () =>
      getUserDataOnSupabase("UserSubscriptions", session)
    );

  const {
    data: recentlyPlayed,
    error: recentlyPlayedError,
  }: { data: Array<TRecentlyPlayed> | undefined; error: string | undefined } =
    useSWR("/supabase/reads/UserRecentlyPlayed", () =>
      getUserDataOnSupabase("UserRecentlyPlayed", session)
    );



  useEffect(() => {
    setCurrentSinger({
      singerId: subscriptions?.[0].singer.id,
      singerName: subscriptions?.[0].singer.name,
    });
  }, [subscriptions]);

  return (
    <Stack w={"full"} overflow={"hidden"}>
      <Subscription />
      <HStack h={"full"} overflow={"auto"}>

          <Stack {...parentStyles(3, "purple.900")}>
            <TopTenTrack />
          </Stack>
          <Stack {...parentStyles(1.5, "green.900")}>
            <Pinned />
          </Stack>
          <Stack {...parentStyles(2, "red.900")}>
            <RecentlyPlayed />
            <Playlists />
          </Stack>

      </HStack>
      <CreatePlaylist />
    </Stack>
  );
};

export default Index;
